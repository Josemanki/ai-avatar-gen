import type { Avatar } from "@prisma/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const avatarRouter = createTRPCRouter({
  getUserAvatars: protectedProcedure.query(async ({ ctx }) => {
    const avatars = await ctx.prisma.avatar.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return avatars;
  }),
  getCommunityAvatars: publicProcedure.query(async ({ ctx }) => {
    const communityAvatars: Avatar[] = await ctx.prisma.$queryRawUnsafe(
      `SELECT * FROM "Avatar" ORDER BY RANDOM() LIMIT 20;`
    );
    const returnedAvatars = communityAvatars.map((avatar) => {
      const { highResURL, ...rest } = avatar;
      return rest;
    });
    return returnedAvatars;
  }),
});
