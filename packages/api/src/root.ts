import { authRouter } from './routers/auth'
import { testRouter } from './routers/test'
import { router } from './trpc'

export const satheneRouter = router({
    auth: authRouter,
    test: testRouter
})

export type SatheneRouter = typeof satheneRouter
