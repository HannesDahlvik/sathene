import { procedure, router } from '../trpc'
import { z } from 'zod'

export const testRouter = router({
    hello: procedure
        .input(
            z.object({
                name: z.string().min(3)
            })
        )
        .query(({ input }) => {
            return `Hello ${input.name}`
        })
})
