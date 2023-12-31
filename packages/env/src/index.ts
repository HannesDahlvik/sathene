import { parseEnv } from 'znv'
import { z } from 'zod'

const env = parseEnv(process.env, {
    NODE_ENV: z.enum(['production', 'development']).default('development'),
    DATABASE_URL: z.string().min(1)
})

export { env }
