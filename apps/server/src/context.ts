import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

type SatheneContext = {
    token: string | null
}

function createContext({ req }: FetchCreateContextFnOptions): SatheneContext {
    const token = req.headers.get('Authorization')

    return {
        token
    }
}

export { createContext, type SatheneContext }
