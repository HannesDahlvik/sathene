import { cache } from 'react'

import * as context from 'next/headers'

import { db, emailVerification, eq } from '@sathene/db'

import { auth } from './lucia'
import { TRPCError } from '@trpc/server'
import { TimeSpan, createDate } from 'oslo'
import { alphabet, generateRandomString } from 'oslo/crypto'

export const getServerSession = cache(async () => {
    const sessionId = context.cookies().get(auth.sessionCookieName)?.value ?? null
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
            context.cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }
        if (!result.session) {
            const sessionCookie = auth.createBlankSessionCookie()
            context.cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }
    } catch {}

    return result
})

export async function generateEmailVerificationCode(
    userId: string,
    email: string
): Promise<string> {
    await db
        .delete(emailVerification)
        .where(eq(emailVerification.userId, userId))
        .catch((err) => {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: err.message
            })
        })

    const code = generateRandomString(6, alphabet('0-9', 'A-Z'))

    await db
        .insert(emailVerification)
        .values({
            code,
            email,
            expiresAt: createDate(new TimeSpan(30, 'm')),
            userId
        })
        .catch((err) => {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: err.message
            })
        })

    return code
}