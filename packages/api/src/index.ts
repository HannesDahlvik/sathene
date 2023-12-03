import type { satheneRouter } from './root'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export { createContext } from './context'
export { satheneRouter, type satheneRouter } from './root'
export { type Auth, auth, getPageSession } from './auth/lucia'
export { type Session, type User } from 'lucia'

export type RouterInputs = inferRouterInputs<satheneRouter>

export type RouterOutputs = inferRouterOutputs<satheneRouter>
