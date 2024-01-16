import { prisma } from '@template-project/template-prisma';
import { API_KEY, API_URL, API_VERSION, SECRET_KEY, getAuth, } from '@clerk/nextjs/server';
import { decodeJwt, signedInAuthObject, signedOutAuthObject, } from '@clerk/clerk-sdk-node';
/**
 * This helper generates the "internals" for a tRPC context.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerContext = (opts) => {
    return {
        prisma,
        auth: opts.auth,
    };
};
export const createNextContext = (opts) => {
    return createInnerContext({ auth: getAuth(opts.req) });
};
const parseJwt = (req) => {
    const headerToken = req.headers.authorization?.replace('Bearer ', '');
    return decodeJwt(headerToken || '');
};
export const createExpressContext = ({ req }) => {
    const options = {
        apiKey: API_KEY,
        secretKey: SECRET_KEY,
        apiUrl: API_URL,
        apiVersion: API_VERSION,
        authStatus: req.headers.authStatus,
        authMessage: req.headers.authMessage,
        authReason: req.headers.authReason,
    };
    let auth;
    try {
        const jwt = parseJwt(req);
        auth = signedInAuthObject(jwt.payload, { ...options, token: jwt.raw.text });
    }
    catch (error) {
        auth = signedOutAuthObject(options);
    }
    return createInnerContext({ auth });
};
//# sourceMappingURL=createContext.js.map