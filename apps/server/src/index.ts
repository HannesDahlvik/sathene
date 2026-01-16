import { env } from '@sathene/env'

import { serve } from '@hono/node-server'
import { trpcServer } from '@hono/trpc-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { createContext } from './context.js'
import { satheneRouter } from './root.js'

const app = new Hono()

app.use(logger())
app.use('*', cors())
app.get('/', (c) => c.text('Server is running!'))
app.use(
    '/trpc/*',
    trpcServer({
        router: satheneRouter,
        createContext: createContext
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
