import { env } from '@sathene/env'

import { type Config } from 'drizzle-kit'

export default {
    schema: './src/schema.ts',
    out: './drizzle',
    driver: 'turso',
    dbCredentials: {
        url: env.DATABASE_URL,
        authToken: env.DATABASE_AUTH_TOKEN
    }
} satisfies Config
