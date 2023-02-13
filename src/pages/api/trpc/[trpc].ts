import { createNextApiHandler } from "@trpc/server/adapters/next";
import { type inferRouterOutputs, type inferRouterInputs } from "@trpc/server";

import { env } from "../../../env/server.mjs";
import { createTRPCContext } from "../../../server/api/trpc";
import { appRouter } from "../../../server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});

export type RouterInput = inferRouterInputs<typeof appRouter>
export type RouterOutput = inferRouterOutputs<typeof appRouter>