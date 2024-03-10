import { env } from '@sathene/env'

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/schema.ts',
    out: './drizzle',
    driver: 'pg',
    verbose: true,
    dbCredentials: {
        connectionString: env.DATABASE_URL
    }
})
