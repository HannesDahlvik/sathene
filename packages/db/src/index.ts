import { env } from '@sathene/env'

import * as schema from './schema'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

export const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql as any, {
    schema
})
export * from './schema'
export * from 'drizzle-orm'
