import { cookies } from 'next/headers'

import { account, db, user } from '@sathene/db'
import { env } from '@sathene/env'

import { auth } from '../../auth/lucia'
import { github } from '../../auth/utils'
import { createUserTaskList } from '../../lib/utils'
import { procedure, router } from '../../trpc'
import { TRPCError } from '@trpc/server'
import { OAuth2RequestError, generateState } from 'arctic'
import { generateId } from 'lucia'
import { z } from 'zod'

export const oAuthGithubRouter = router({
    login: procedure.query(async () => {
        const state = generateState()
        const url = await github.createAuthorizationURL(state)

        cookies().set('github_oauth_state', state, {
            path: '/',
            secure: env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 60 * 10
        })

        return url
    }),
    callback: procedure
        .input(
            z.object({
                code: z.string(),
                state: z.string()
            })
        )
        .query(async ({ input }) => {
            const storedState = cookies().get('github_oauth_state')?.value ?? null

            if (!input.code || !input.state || !storedState || input.state !== storedState) {
                throw new TRPCError({
                    code: 'BAD_REQUEST'
                })
            }

            try {
                const tokens = await github.validateAuthorizationCode(input.code)
                const githubUserResponse = await fetch('https://api.github.com/user', {
                    headers: {
                        Authorization: `Bearer ${tokens.accessToken}`
                    }
                })
                const githubUser = await githubUserResponse.json()

                const existingAccount = await db.query.account
                    .findFirst({
                        where: (field, { and, eq }) =>
                            and(
                                eq(field.providerId, 'github'),
                                eq(field.providerUserId, githubUser.id)
                            )
                    })
                    .catch((err) => {
                        throw new TRPCError({
                            code: 'INTERNAL_SERVER_ERROR',
                            message: err.message
                        })
                    })

                if (existingAccount) {
                    const session = await auth.createSession(existingAccount.userId, {})
                    const sessionCookie = auth.createSessionCookie(session.id)
                    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

                    return { sessionCookie }
                }

                const userId = generateId(25)
                await db.insert(user).values({
                    id: userId,
                    username: githubUser.login
                })
                await db.insert(account).values({
                    providerId: 'github',
                    providerUserId: githubUser.id,
                    userId
                })

                const session = await auth.createSession(userId, {})
                const sessionCookie = auth.createSessionCookie(session.id)
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

                await createUserTaskList(userId)

                return { sessionCookie }
            } catch (err: any) {
                if (err instanceof OAuth2RequestError) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Invalid code'
                    })
                }

                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: err.message
                })
            }
        })
})
