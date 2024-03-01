import { db, session, user } from '@sathene/db'
import { env } from '@sathene/env'

import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'
import { webcrypto } from 'node:crypto'

globalThis.crypto = webcrypto as Crypto

const adapter = new DrizzleMySQLAdapter(db, session, user)

export const auth = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: env.NODE_ENV === 'production'
        }
    },
    getUserAttributes: (data) => {
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            email_verified: data.email_verified
        }
    }
})

export type Auth = typeof auth

declare module 'lucia' {
    interface Register {
        Lucia: typeof auth
        DatabaseUserAttributes: {
            id: string
            username: string
            email: string
            email_verified: boolean
        }
    }
}
