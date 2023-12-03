import { createContext, satheneRouter } from '@sathene/api'

export const caller = satheneRouter.createCaller(
    await createContext({
        type: 'rsc'
    })
)
