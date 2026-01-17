import type { Context as HonoContext } from 'hono'

import { auth } from './lib/auth.js'

type Context = {
    hono: HonoContext
}

async function createContext({ hono }: Context) {
    const session = await auth.api.getSession({
        headers: hono.req.raw.headers
    })

    return {
        auth: session
    }
}

export { createContext }
export type SatheneContext = Awaited<ReturnType<typeof createContext>>
