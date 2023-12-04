import * as context from 'next/headers'

import { auth } from './auth/lucia'
import { createContext } from './context'
import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson
})

export const router = t.router
export const procedure = t.procedure
export const authedProcedure = procedure.use(async ({ ctx, next }) => {
    if (ctx.req) {
        const authRequest = auth.handleRequest(ctx.req?.method, context)

        let session = await authRequest.validate()

        if (!session)
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Not authenticated'
            })

        return next({
            ctx: {
                user: session.user,
                session
            }
        })
    } else {
        throw new TRPCError({
            code: 'BAD_REQUEST'
        })
    }
})
