import * as context from 'next/headers'

import { auth } from '../auth/lucia'
import { satheneRouter } from '../root'
import { authedProcedure, procedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const authRouter = router({
    login: procedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(6)
            })
        )
        .mutation(async ({ ctx, input }) => {
            const key = await auth
                .useKey('email', input.email.toLowerCase(), input.password)
                .catch((err) => {
                    throw new TRPCError({
                        code: 'UNAUTHORIZED',
                        message: err.message
                    })
                })
            const session = await auth
                .createSession({
                    userId: key.userId,
                    attributes: {}
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            if (ctx.req) {
                const authRequest = auth.handleRequest(ctx.req.method, context)
                authRequest.setSession(session)
            } else {
                throw new TRPCError({
                    code: 'BAD_REQUEST'
                })
            }

            return session.user
        }),
    signup: procedure
        .input(
            z.object({
                username: z.string().min(3),
                email: z.string().email(),
                password: z.string().min(6)
            })
        )
        .mutation(async ({ ctx, input }) => {
            const user = await auth
                .createUser({
                    attributes: {
                        username: input.username
                    },
                    key: {
                        providerId: 'email',
                        providerUserId: input.email.toLowerCase(),
                        password: input.password
                    }
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })
            const session = await auth
                .createSession({
                    userId: user.userId,
                    attributes: {}
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            if (ctx.req) {
                const authRequest = auth.handleRequest(ctx.req.method, context)
                authRequest.setSession(session)
            } else {
                throw new TRPCError({
                    code: 'BAD_REQUEST'
                })
            }

            const caller = satheneRouter.createCaller({
                type: 'rsc'
            })
            await caller.task.list.create({
                name: 'My Tasks'
            })

            return session.user
        }),
    logout: authedProcedure.mutation(async ({ ctx }) => {
        await auth.invalidateSession(ctx.session.sessionId)

        if (ctx.req) {
            const authRequest = auth.handleRequest(ctx.req.method, context)
            authRequest.setSession(null)
        } else {
            throw new TRPCError({
                code: 'BAD_REQUEST'
            })
        }

        return null
    })
})
