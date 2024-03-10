import { parseEnv } from 'znv'
import { z } from 'zod'

const env = parseEnv(process.env, {
    NODE_ENV: z.enum(['production', 'development']).default('development'),
    DATABASE_URL: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1)
})

export { env }
