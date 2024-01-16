// import { authWebhook } from '@acme/webhook';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';

import { publicProcedure, router } from './trpc.js';
import { authRouter } from './routers/auth/auth.router.js';
import { taskRouter } from './routers/task/task.router.js';
import { env } from './env.js';

import { createExpressContext } from './context/createContext.js';

const app = express();
const port = env.EXPRESS_PORT ?? 3000;

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
const appRouter = router({
  health: publicProcedure.query(({ ctx }) => ({
    message: "I'm Working Fine Fella." + ctx.auth.userId,
  })),
  task: taskRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: createExpressContext,
  }),
);

// app.use('/api/webhooks/user', express.json(), (req, res) => {
//   authWebhook(req.body, req.headers)
//     .then(({ code, msg }) => {
//       res.status(code).json({ message: msg });
//     })
//     .catch(() => {
//       res.status(500).json({ message: 'webhook error' });
//     });
// });

app.get('/', (req, res) => {
  res.send('Sa');
});

app.get('/hello/there', (req, res) => {
  res.send('cool');
});

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`,
  );
});
