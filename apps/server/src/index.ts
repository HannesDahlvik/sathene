import { env } from '@sathene/env'

import { serve } from '@hono/node-server'
import { trpcServer } from '@hono/trpc-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { createContext } from './context.js'
import { auth } from './lib/auth.js'
import { satheneRouter } from './root.js'

const app = new Hono()

app.use(logger())
app.use(
    '*',
    cors({
        origin: ['http://localhost:5173'],
        allowHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    })
)

app.on(['GET', 'POST'], '/api/auth/**', (c) => auth.handler(c.req.raw))
app.use(
    '/trpc/*',
    trpcServer({
        router: satheneRouter,
        createContext: (_opts, hono) => {
            return createContext({ hono })
        }
    })
)

serve(
    {
        fetch: app.fetch,
        port: env.SERVER_PORT
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`)
    }
)

export { type SatheneRouter } from './root.js'
export { auth } from './lib/auth.js'
