import { authProcedure, router } from '../trpc.js'

const overviewRouter = router({
    data: authProcedure.query(async ({ ctx }) => {
        return 'Overview data'
    })
})

export { overviewRouter }
