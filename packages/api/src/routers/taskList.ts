import { and, db, eq, taskList } from '@sathene/db'

import { createId } from '../lib/utils'
import { authedProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const taskListRouter = router({
    all: authedProcedure.query(async ({ ctx }) => {
        const taskLists = await db.query.taskList.findMany({
            where: (col, { eq }) => eq(col.userId, ctx.user.userId),
            orderBy: (col, { asc }) => asc(col.createdAt)
        })

        return taskLists
    }),
    create: authedProcedure
        .input(
            z.object({
                name: z.string().min(3)
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .insert(taskList)
                .values({
                    id: createId(),
                    userId: ctx.user.userId,
                    name: input.name
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        }),
    rename: authedProcedure
        .input(
            z.object({
                listId: z.string().cuid2(),
                newName: z.string().min(3)
            })
        )
        .mutation(async ({ input }) => {
            await db
                .update(taskList)
                .set({
                    name: input.newName
                })
                .where(and(eq(taskList.id, input.listId)))
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        }),
    delete: authedProcedure
        .input(
            z.object({
                listid: z.string().cuid2()
            })
        )
        .mutation(async ({ input }) => {
            await db
                .delete(taskList)
                .where(and(eq(taskList.id, input.listid)))
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        })
})
