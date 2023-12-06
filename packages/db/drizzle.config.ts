import { env } from '@sathene/env'

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/schema.ts',
    out: './drizzle',
    driver: 'mysql2',
    verbose: true,
    dbCredentials: {
        uri: env.DATABASE_URL
    }
})
