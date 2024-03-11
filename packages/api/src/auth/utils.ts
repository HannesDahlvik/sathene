import { cache } from 'react'

import { cookies } from 'next/headers'

import { env } from '@sathene/env'

import { auth } from './lucia'
import { GitHub } from 'arctic'
import type { Session, User } from 'lucia'

export const getServerSession = cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(auth.sessionCookieName)?.value ?? null
        if (!sessionId) {
            return {
                user: null,
                session: null
            }
        }

        const result = await auth.validateSession(sessionId)
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = auth.createSessionCookie(result.session.id)
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
            }
            if (!result.session) {
                const sessionCookie = auth.createBlankSessionCookie()
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
            }
        } catch {}

        return result
    }
)

export const github = new GitHub(env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET)
