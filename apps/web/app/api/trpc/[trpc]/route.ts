import { satheneRouter } from '@sathene/api'

import { type FetchCreateContextFnOptions, fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (request: Request) => {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: satheneRouter,
        createContext: function (opts: FetchCreateContextFnOptions) {
            return {
                type: 'api',
                req: opts.req,
                resHeaders: opts.resHeaders
            }
        }
    })
}

export const GET = handler
export const POST = handler
