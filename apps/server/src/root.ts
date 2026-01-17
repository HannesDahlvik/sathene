import { overviewRouter } from './routers/overview.js'
import { router } from './trpc.js'

const satheneRouter = router({
    overview: overviewRouter
})

type SatheneRouter = typeof satheneRouter

export { satheneRouter }
export type { SatheneRouter }
