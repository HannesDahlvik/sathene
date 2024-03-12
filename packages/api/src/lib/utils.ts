import { cookies } from 'next/headers'

import { account, db, taskList, user } from '@sathene/db'

import { auth } from '../auth/lucia'
import { init } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'
import { generateId } from 'lucia'

/**
 * Generate a 24 character long cuid2 id
 */
export const createId = init({
    length: 24
})

interface CheckAndOrCreateAccountProps {
    providerId: string
    providerUserId: string
    username: string
}

export async function checkAndOrCreateAccount({
    providerId,
    providerUserId,
    username
}: CheckAndOrCreateAccountProps) {
    const existingAccount = await db.query.account
        .findFirst({
            where: (field, { and, eq }) =>
                and(eq(field.providerId, providerId), eq(field.providerUserId, providerUserId))
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
        username
    })
    await db.insert(account).values({
        providerId,
        providerUserId,
        userId
    })

    const session = await auth.createSession(userId, {})
    const sessionCookie = auth.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    await db
        .insert(taskList)
        .values({
            id: createId(),
            name: 'My Tasks',
            userId
        })
        .catch((err) => {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: err.message
            })
        })

    return { sessionCookie }
}
