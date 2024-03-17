import { cookies } from 'next/headers'

import { env } from '@sathene/env'

import { google } from '../../auth/utils'
import { checkAndOrCreateAccount } from '../../lib/utils'
import { procedure, router } from '../../trpc'
import { TRPCError } from '@trpc/server'
import { generateCodeVerifier, OAuth2RequestError, generateState } from 'arctic'
import { z } from 'zod'

export const oAuthGoogleRouter = router({
    login: procedure.query(async () => {
        const state = generateState()
        const codeVerifier = generateCodeVerifier()
        const url = await google.createAuthorizationURL(state, codeVerifier, {
            scopes: ['profile']
        })

        cookies().set('state', state, {
            path: '/',
            secure: env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 60 * 10
        })

        cookies().set('code_verifier', codeVerifier, {
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
            const storedCodeVerifier = cookies().get('code_verifier')?.value ?? null

            if (!input.code || !storedState || !storedCodeVerifier || input.state !== storedState) {
                throw new TRPCError({
                    code: 'BAD_REQUEST'
                })
            }

            try {
                const tokens = await google.validateAuthorizationCode(
                    input.code,
                    storedCodeVerifier
                )
                const userResponse = await fetch(
                    'https://openidconnect.googleapis.com/v1/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    }
                )
                const user = await userResponse.json()

                return await checkAndOrCreateAccount({
                    providerId: 'google',
                    providerUserId: user.sub,
                    username: user.name
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
