import { env } from '@sathene/env'

import * as schema from './schema'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

export const libsqlClient = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN
})

export const db = drizzle(libsqlClient, {
    schema
})
