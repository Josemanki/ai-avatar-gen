import { z } from "zod";
import { Configuration, type ImagesResponseDataInner, OpenAIApi } from "openai";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { v4 as uuid } from "uuid";
import { s3Client } from "../../aws/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../../../env.mjs";
import { resizeImage } from "../../../utils/image";

const configuration = new Configuration({
  apiKey: env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const GenerateInput = z.object({
  prompt: z.string(),
  color: z.string(),
  style: z.string(),
  shape: z.string(),
  amount: z.number(),
});

type TGenerateInput = z.infer<typeof GenerateInput>;

const generatePrompt = (input: TGenerateInput) => {
  switch (input.style) {
    case "Pixelated":
      return `${input.prompt} on a ${input.color} gradient background, as a ${input.shape} icon, pixel art`;
    case "Polygon":
      return `${input.prompt} on a ${input.color} gradient background, as a ${input.shape} icon, polygon art`;
    case "Metallic":
      return `A 3D render of ${input.prompt} with a gradient ${input.color} background as a ${input.shape} icon, metallic art`;
    default:
      return `${input.prompt} 3D render on a ${input.color} gradient background, with a ${input.style} style, as a ${input.shape} icon`;
  }
};

export const generateRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(GenerateInput)
    .query(async ({ input, ctx }) => {
      await ctx.prisma.$transaction(async (tx) => {
        const sender = await tx.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            credits: { decrement: input.amount },
          },
        });

        if (sender.credits < 0) {
          throw new Error("Not enough credits!");
        }
      });

      const response = await openai.createImage({
        prompt: generatePrompt(input),
        n: input.amount,
        size: "512x512",
        response_format: "b64_json",
      });

      const image_urls = response?.data?.data;

      for (let i = 0; i < image_urls.length; i++) {
        const lowResUuid = uuid();
        const highResUuid = uuid();
        const element = image_urls[i] as ImagesResponseDataInner;
        const base64 = element.b64_json as string;

        const base64Buffer = Buffer.from(
          base64.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        const lowResImageBuffer = await resizeImage(base64Buffer, 256);

        await s3Client.send(
          new PutObjectCommand({
            Bucket: env.APP_AWS_S3_BUCKET_NAME,
            Key: `low-res/${lowResUuid}`,
            ContentType: "image/png",
            ContentEncoding: "base64",
            Body: lowResImageBuffer,
          })
        );

        await s3Client.send(
          new PutObjectCommand({
            Bucket: env.APP_AWS_S3_BUCKET_NAME,
            Key: `high-res/${highResUuid}`,
            ContentType: "image/png",
            ContentEncoding: "base64",
            Body: base64Buffer,
          })
        );

        await ctx.prisma.avatar.create({
          data: {
            userId: ctx.session.user.id,
            prompt: input.prompt,
            lowResURL: lowResUuid,
            highResURL: highResUuid,
          },
        });
      }

      return image_urls;
    }),
});
