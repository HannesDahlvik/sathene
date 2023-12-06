import { env } from '@sathene/env'

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/schema.ts',
    out: './drizzle',
    driver: 'mysql2',
    strict: true,
    verbose: true,
    dbCredentials: {
        uri: env.DATABASE_URL
    }
})
