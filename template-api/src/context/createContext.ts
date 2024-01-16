import { prisma } from '@template-project/template-prisma';
import type {
  LooseAuthProp,
} from '@clerk/nextjs/api';

import {
  signedOutAuthObject, type WithAuthProp
} from '@clerk/clerk-sdk-node';
import { type CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { Request } from 'express';

type CreateContextOptions = {
  auth: LooseAuthProp['auth'];
};

/**
 * This helper generates the "internals" for a tRPC context.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerContext = (opts: CreateContextOptions) => {
  return {
    prisma,
    auth: opts.auth,
  };
};

export const createExpressContext = ({ req }: CreateExpressContextOptions & { req: WithAuthProp<Request> }) => {
 const auth: LooseAuthProp['auth'] = req.auth ?? signedOutAuthObject();
  return createInnerContext({ auth });
};
