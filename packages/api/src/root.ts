import { authRouter } from './routers/auth'
import { noteRouter } from './routers/notes'
import { taskRouter } from './routers/task'
import { router } from './trpc'

export const satheneRouter = router({
    auth: authRouter,
    task: taskRouter,
    note: noteRouter
})

export type SatheneRouter = typeof satheneRouter
