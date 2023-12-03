import { cache } from 'react'

import * as context from 'next/headers'

import { libsqlClient } from '@sathene/db'
import { env } from '@sathene/env'

import { libsql } from '@lucia-auth/adapter-sqlite'
import { lucia } from 'lucia'
import { nextjs_future } from 'lucia/middleware'
import 'lucia/polyfill/node'

export const auth = lucia({
    env: env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
    middleware: nextjs_future(),
    adapter: libsql(libsqlClient, {
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

export const getPageSession = cache(() => {
    const authRequest = auth.handleRequest('GET', context)
    return authRequest.validate()
})
