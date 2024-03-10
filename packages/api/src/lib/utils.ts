import { db, taskList, type User } from '@sathene/db'

import { init } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'

/**
 * Generate a 24 character long cuid2 id
 */
export const createId = init({
    length: 24
})

export async function createUserTaskList(userId: string) {
    await db
        .insert(taskList)
        .values({
            id: createId(),
            name: 'My Tasks',
            userId
        })
        .catch((err) => {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: err.message
            })
        })
}
