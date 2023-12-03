import { parseEnv } from 'znv'
import { z } from 'zod'

const env = parseEnv(process.env, {
    NODE_ENV: z.enum(['production', 'development']),
    DATABASE_URL: z.string().min(1),
    DATABASE_AUTH_TOKEN: z.string().min(1).optional()
})

export { env }
