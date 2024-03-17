import { cookies } from 'next/headers'

import { db, eq, user } from '@sathene/db'

import { auth } from '../auth/lucia'
import { getServerSession } from '../auth/utils'
import { authedProcedure, router } from '../trpc'
import { oAuthGithubRouter } from './oAuth/github'
import { oAuthGoogleRouter } from './oAuth/google'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const authRouter = router({
    github: oAuthGithubRouter,
    google: oAuthGoogleRouter,
    edit: authedProcedure
        .input(
            z.object({
                username: z.string().min(3)
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .update(user)
                .set({
                    username: input.username
                })
                .where(eq(user.id, ctx.user.id))
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        }),
    logout: authedProcedure.mutation(async ({ ctx }) => {
        const { session } = await getServerSession()

        if (!session) {
            throw new TRPCError({
                code: 'UNAUTHORIZED'
            })
        }

        await auth.invalidateSession(ctx.session.id)

        const sessionCookie = auth.createBlankSessionCookie()
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return null
    })
})
