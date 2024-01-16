// import { authWebhook } from '@acme/webhook';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express,{type Request} from 'express';

import { publicProcedure, router } from './trpc.js';
import { authRouter } from './routers/auth/auth.router.js';
import { taskRouter } from './routers/task/task.router.js';
import { env } from './env.js';
import {helloFromLib}  from '@template-project/template-lib';

import { createExpressContext } from './context/createContext.js';
import cors from 'cors';
import { ClerkExpressWithAuth, type WithAuthProp } from '@clerk/clerk-sdk-node';

const app = express();
const port = env.EXPRESS_PORT ?? 3000;

app.use(cors())

// middleware to add auth object on req
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use(ClerkExpressWithAuth({
  strict: false
}))

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

app.get('/', (req: WithAuthProp<Request>, res) => {
  console.log("req.auth", req.auth);
  const msg = helloFromLib()
  res.json({ msg, auth: req.auth });
});

app.get('/hello/there', (req, res) => {
  res.send('cool');
});

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`,
  );
});
