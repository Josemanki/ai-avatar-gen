import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
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
  generate: protectedProcedure.input(GenerateInput).query(async ({ input }) => {
    const response = await openai.createImage({
      prompt: generatePrompt(input),
      n: input.amount,
      size: "256x256",
    });
    const image_url = response?.data?.data;
    console.log(image_url);
    return image_url;
  }),
});
