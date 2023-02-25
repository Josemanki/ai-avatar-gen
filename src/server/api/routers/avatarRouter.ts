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
    const communityAvatars = await ctx.prisma.avatar.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
    });
    const returnedAvatars = communityAvatars.map((avatar) => {
      const { highResURL, ...rest } = avatar;
      return rest;
    });
    return returnedAvatars;
  }),
});
