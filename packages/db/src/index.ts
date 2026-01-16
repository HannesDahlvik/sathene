import { env } from '@sathene/env'

import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema.js'

const db = drizzle(env.DATABASE_URL, { schema })

export { db }
export * from './schema.js'
export * from 'drizzle-orm'
