import { type SatheneRouter } from './root'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export { createContext } from './context'
export { type SatheneRouter, satheneRouter } from './root'
export { type Auth, auth, getServerSession } from './auth/lucia'
export { type Session, type User } from 'lucia'

export type RouterInputs = inferRouterInputs<SatheneRouter>

export type RouterOutputs = inferRouterOutputs<SatheneRouter>
