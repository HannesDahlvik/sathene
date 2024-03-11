import { cookies } from 'next/headers'

import { auth } from '../auth/lucia'
import { getServerSession } from '../auth/utils'
import { authedProcedure, router } from '../trpc'
import { oAuthGithubRouter } from './oAuth/github'
import { oAuthGoogleRouter } from './oAuth/google'
import { TRPCError } from '@trpc/server'

export const authRouter = router({
    github: oAuthGithubRouter,
    google: oAuthGoogleRouter,
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
