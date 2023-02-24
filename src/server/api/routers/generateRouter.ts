import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { v4 as uuid } from "uuid";
import { s3Client } from "../../aws/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../../../env.mjs";

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
      const response = await openai.createImage({
        prompt: generatePrompt(input),
        n: input.amount,
        size: "256x256",
        response_format: "b64_json",
      });

      const image_urls = response?.data?.data;

      for (let i = 0; i < image_urls.length; i++) {
        const lowResUuid = uuid();
        const highResUuid = uuid();
        const element = image_urls[i];
        const base64 = element.b64_json;

        const base64Data = Buffer.from(
          base64.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        await s3Client.send(
          new PutObjectCommand({
            Bucket: env.AWS_S3_BUCKET_NAME,
            Key: `low-res/${lowResUuid}`,
            ContentType: "image/png",
            ContentEncoding: "base64",
            Body: base64Data,
          })
        );

        await s3Client.send(
          new PutObjectCommand({
            Bucket: env.AWS_S3_BUCKET_NAME,
            Key: `high-res/${highResUuid}`,
            ContentType: "image/png",
            ContentEncoding: "base64",
            Body: base64Data,
          })
        );

        await ctx.prisma.avatar.create({
          data: {
            userId: ctx.session.user.id,
            lowResURL: lowResUuid,
            highResURL: highResUuid,
          },
        });
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          credits: { decrement: input.amount },
        },
      });

      return image_urls;
    }),
});
