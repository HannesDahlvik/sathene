import { cache } from 'react'

import * as context from 'next/headers'

import { mysqlConnection } from '@sathene/db'
import { env } from '@sathene/env'

import { mysql2 } from '@lucia-auth/adapter-mysql'
import { lucia } from 'lucia'
import { nextjs_future } from 'lucia/middleware'
import 'lucia/polyfill/node'

export const auth = lucia({
    env: env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
    middleware: nextjs_future(),
    adapter: mysql2(mysqlConnection, {
        key: 'key',
        session: 'session',
        user: 'user'
    }),
    sessionCookie: {
        expires: false
    },
    getUserAttributes: (data) => {
        return {
            username: data.username
        }
    }
})

export type Auth = typeof auth

export const getServerSession = cache(() => {
    const authRequest = auth.handleRequest('GET', context)
    return authRequest.validate()
})
