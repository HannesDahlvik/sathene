import { and, db, eq, sortOrderEnumValues, taskList } from '@sathene/db'

import { TRPCError } from '@trpc/server'
import { ulid } from 'ulid'
import z from 'zod'

import { authProcedure, router } from '../trpc.js'

const taskListRouter = router({
    create: authProcedure
        .input(
            z.object({
                name: z.string().min(3)
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .insert(taskList)
                .values({
                    id: ulid(),
                    userId: ctx.user.id,
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
    edit: authProcedure
        .input(
            z.object({
                listId: z.ulid(),
                name: z.string().min(3).optional(),
                sortOrder: z.enum(sortOrderEnumValues).optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .update(taskList)
                .set({
                    name: input.name,
                    sortOrder: input.sortOrder
                })
                .where(and(eq(taskList.id, input.listId), eq(taskList.userId, ctx.user.id)))
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        }),
    delete: authProcedure
        .input(
            z.object({
                listId: z.ulid()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .delete(taskList)
                .where(and(eq(taskList.id, input.listId), eq(taskList.userId, ctx.user.id)))
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        })
})

export { taskListRouter }
