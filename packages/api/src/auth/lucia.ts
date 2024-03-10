import { db, session, user } from '@sathene/db'
import { env } from '@sathene/env'

import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'

const adapter = new DrizzlePostgreSQLAdapter(db, session, user)

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
            username: data.username
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
        }
    }
}
