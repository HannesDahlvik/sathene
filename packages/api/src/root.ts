import { authRouter } from './routers/auth'
import { taskRouter } from './routers/task'
import { router } from './trpc'

export const satheneRouter = router({
    auth: authRouter,
    task: taskRouter
})

export type SatheneRouter = typeof satheneRouter
