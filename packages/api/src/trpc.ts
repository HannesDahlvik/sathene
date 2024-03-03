import { getServerSession } from './auth/utils'
import { createContext } from './context'
import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'

export const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson
})

export const router = t.router
export const procedure = t.procedure
export const authedProcedure = procedure.use(async ({ next }) => {
    const { session, user } = await getServerSession()

    if (!session || !user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated'
        })
    }

    return next({
        ctx: {
            user,
            session
        }
    })
})
