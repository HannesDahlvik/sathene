import { cookies } from 'next/headers'

import { env } from '@sathene/env'

import { github } from '../../auth/utils'
import { checkAndOrCreateAccount } from '../../lib/utils'
import { procedure, router } from '../../trpc'
import { TRPCError } from '@trpc/server'
import { OAuth2RequestError, generateState } from 'arctic'
import { z } from 'zod'

export const oAuthGithubRouter = router({
    login: procedure.query(async () => {
        const state = generateState()
        const url = await github.createAuthorizationURL(state)

        cookies().set('state', state, {
            path: '/',
            secure: env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 60 * 10
        })

        return { url }
    }),
    callback: procedure
        .input(
            z.object({
                code: z.string(),
                state: z.string()
            })
        )
        .query(async ({ input }) => {
            const storedState = cookies().get('state')?.value ?? null

            if (!input.code || !input.state || !storedState || input.state !== storedState) {
                throw new TRPCError({
                    code: 'BAD_REQUEST'
                })
            }

            try {
                const tokens = await github.validateAuthorizationCode(input.code)
                const userResponse = await fetch('https://api.github.com/user', {
                    headers: {
                        Authorization: `Bearer ${tokens.accessToken}`
                    }
                })
                const user = await userResponse.json()

                return await checkAndOrCreateAccount({
                    providerId: 'github',
                    providerUserId: user.id,
                    username: user.login
                })
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
