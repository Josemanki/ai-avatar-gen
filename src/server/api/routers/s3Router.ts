import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { env } from "../../../env.mjs";
import { s3Client } from "../../aws/client";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const s3Router = createTRPCRouter({
  createPresignedURL: protectedProcedure
    .input(z.object({ fileName: z.string() }))
    .query(async ({ input }) => {
      const putObjectCommand = new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: input.fileName,
      });
      const url = await getSignedUrl(s3Client, putObjectCommand, {
        expiresIn: 15 * 60,
      });
      return url;
    }),
});
