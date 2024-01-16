import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { enforceUserIsAuthed } from './middlewares/enforceUserIsAuthed.js';
import type { createExpressContext } from './context/createContext.js';

const t = initTRPC.context<typeof createExpressContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;

const middleware = t.middleware;
export type Middleware = typeof middleware;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
  enforceUserIsAuthed(middleware),
);
