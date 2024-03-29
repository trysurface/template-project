import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    EXPRESS_PORT: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    EXPRESS_PORT: process.env.EXPRESS_PORT,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
