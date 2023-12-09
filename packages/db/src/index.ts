import { env } from '@sathene/env'

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

export const mysqlConnection = await mysql.createConnection({
    uri: env.DATABASE_URL
})
export const db = drizzle(mysqlConnection, {
    mode: env.NODE_ENV === 'production' ? 'planetscale' : 'default',
    schema
})
export * from './schema'
export * from 'drizzle-orm'
