import { db, eq } from '@sathene/db'
import { task } from '@sathene/db/src/schema'

import { createId } from '../lib/utils'
import { authedProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const tasksRouter = router({
    all: authedProcedure.query(async ({ ctx }) => {
        const tasks = await db.query.task.findMany({
            where: (task, { eq }) => eq(task.userId, ctx.user.userId)
        })

        return tasks
    }),
    create: authedProcedure
        .input(
            z.object({
                title: z.string().min(3),
                details: z.string().optional(),
                deadline: z.date().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .insert(task)
                .values({
                    id: createId(),
                    title: input.title,
                    userId: ctx.user.userId,
                    deadline: input.deadline,
                    details: input.details
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        }),
    edit: authedProcedure
        .input(
            z.object({
                taskId: z.string().cuid2(),
                title: z.string().optional(),
                completed: z.boolean().optional(),
                deadline: z.date().optional(),
                details: z.string().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .update(task)
                .set({
                    title: input.title,
                    completed: input.completed,
                    deadline: input.deadline,
                    details: input.details
                })
                .where(eq(task.id, input.taskId))
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
                taskId: z.string().cuid2()
            })
        )
        .mutation(async ({ input }) => {
            await db
                .delete(task)
                .where(eq(task.id, input.taskId))
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        })
})
