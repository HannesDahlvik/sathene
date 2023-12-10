import * as context from 'next/headers'
import type { NextRequest } from 'next/server'

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
    const req = ctx.req as NextRequest
    const authRequest = auth.handleRequest(req ? req.method : 'GET', context)
    const session = await authRequest.validate()

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
})
