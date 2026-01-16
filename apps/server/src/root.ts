import { router } from './trpc.js'

const satheneRouter = router({})

type SatheneRouter = typeof satheneRouter

export { satheneRouter }
export type { SatheneRouter }
