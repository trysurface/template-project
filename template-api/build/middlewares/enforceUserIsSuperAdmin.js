import { TRPCError } from '@trpc/server';
export const enforceUserIsSuperAdmin = (middleware) => middleware(({ ctx, next }) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated',
        });
    }
    if (
    // ctx.auth.orgId === env.CLERK_SUPER_ADMIN_ORG_ID &&
    ctx.auth.orgRole === 'admin') {
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
//# sourceMappingURL=enforceUserIsSuperAdmin.js.map