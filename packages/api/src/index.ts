import { type SatheneRouter } from './root'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export { createContext } from './context'
export { type SatheneRouter, satheneRouter } from './root'
export { t } from './trpc'
export { type Auth, auth } from './auth/lucia'
export { generateEmailVerificationCode, getServerSession } from './auth/utils'
export { type Session, type User } from 'lucia'

export type RouterInputs = inferRouterInputs<SatheneRouter>

export type RouterOutputs = inferRouterOutputs<SatheneRouter>
