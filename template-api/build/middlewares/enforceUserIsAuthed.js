import { TRPCError } from '@trpc/server';
export const enforceUserIsAuthed = (middleware) => middleware(({ ctx, next }) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated',
        });
    }
    return next({
        ctx: {
            auth: ctx.auth,
        },
    });
});
//# sourceMappingURL=enforceUserIsAuthed.js.map