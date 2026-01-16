import { initTRPC } from '@trpc/server'
import SuperJSON from 'superjson'

import { type SatheneContext } from './context.js'

const t = initTRPC.context<SatheneContext>().create({
    transformer: SuperJSON
})
const router = t.router
const procedure = t.procedure

export { t, router, procedure }
