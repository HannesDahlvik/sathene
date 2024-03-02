import { createContext, satheneRouter, t } from '@sathene/api'

const createCaller = t.createCallerFactory(satheneRouter)
export const caller = createCaller(
    await createContext({
        type: 'rsc'
    })
)
