import { overviewRouter } from './routers/overview.js'
import { taskRouter } from './routers/task.js'
import { router } from './trpc.js'

const satheneRouter = router({
    overview: overviewRouter,
    task: taskRouter
})

type SatheneRouter = typeof satheneRouter

export { satheneRouter }
export type { SatheneRouter }
