import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { yelpRouter } from "./routers/yelp"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  yelp: yelpRouter,
  example: exampleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
