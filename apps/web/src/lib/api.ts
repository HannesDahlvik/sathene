import type { SatheneRouter } from '@sathene/api'

import { createTRPCReact } from '@trpc/react-query'

export const api = createTRPCReact<SatheneRouter>()
