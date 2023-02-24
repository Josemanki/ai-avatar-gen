import { createTRPCRouter } from "./trpc";
import { generateRouter } from "./routers/generateRouter";
import { userRouter } from "./routers/userRouter";
import { stripeRouter } from "./routers/stripeRouter";
import { s3Router } from "./routers/s3Router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  generate: generateRouter,
  stripe: stripeRouter,
  s3: s3Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
