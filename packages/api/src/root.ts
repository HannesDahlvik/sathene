import { authRouter } from './routers/auth'
import { tasksRouter } from './routers/tasks'
import { router } from './trpc'

export const satheneRouter = router({
    auth: authRouter,
    task: tasksRouter
})

export type SatheneRouter = typeof satheneRouter
