import { TRPCError, initTRPC } from '@trpc/server'
import SuperJSON from 'superjson'

import { type SatheneContext } from './context.js'

const t = initTRPC.context<SatheneContext>().create({
    transformer: SuperJSON
})
const router = t.router
const procedure = t.procedure
const authProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.auth) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Authentication required',
            cause: 'No session'
        })
    }

    return next({
        ctx: {
            session: ctx.auth.session,
            user: ctx.auth.user
        }
    })
})

export { t, router, procedure, authProcedure }
