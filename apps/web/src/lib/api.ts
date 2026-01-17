import type { SatheneRouter } from '@sathene/server'

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { createAuthClient } from 'better-auth/svelte'
import SuperJSON from 'superjson'

const api = createTRPCProxyClient<SatheneRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc/',
            transformer: SuperJSON,
            headers() {
                const token = localStorage.getItem('token')
                if (token) {
                    return {
                        Authorization: token
                    }
                } else return {}
            },
            fetch(url, options) {
                return fetch(url, {
                    ...options,
                    credentials: 'include'
                })
            }
        })
    ]
})

const authClient = createAuthClient({
    baseURL: 'http://localhost:3000/api/auth'
})

export { api, authClient }
