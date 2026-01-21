import { type TaskList, type Tasks, db, eq, taskList, tasks } from '@sathene/db'

import { TRPCError } from '@trpc/server'
import { ulid } from 'ulid'
import z from 'zod'

import { authProcedure, router } from '../trpc.js'
import { taskListRouter } from './taskList.js'

export interface TaskPageReturnData extends TaskList {
    tasks: {
        incompleted: Tasks[]
        completed: Tasks[]
    }
}

const taskRouter = router({
    list: taskListRouter,
    page: authProcedure.query(async ({ ctx }) => {
        let taskLists = await db.query.taskList
            .findMany({
                where: eq(taskList.userId, ctx.user.id),
                with: {
                    tasks: true
                }
            })
            .catch((err) => {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: err.message
                })
            })

        let returnData: TaskPageReturnData[] = []

        taskLists.forEach((list) => {
            const listSortOrder = list.sortOrder
            let tasks = list.tasks

            if (listSortOrder === 'DATE') {
                tasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            } else if (listSortOrder === 'DUEDATE') {
                tasks.sort((a, b) => a.dueDate?.getTime()! - b.dueDate?.getTime()!)
            } else if (listSortOrder === 'TITLE') {
                tasks.sort((a, b) => a.title.localeCompare(b.title))
            }

            let completedTasks = tasks.filter((task) => task.completed)
            let incompletedTasks = tasks.filter((task) => !task.completed)

            returnData.push({
                ...list,
                tasks: {
                    incompleted: incompletedTasks,
                    completed: completedTasks
                }
            })
        })

        returnData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

        return returnData
    }),
    create: authProcedure
        .input(
            z.object({
                listId: z.ulid(),
                title: z.string().min(3),
                details: z.string().optional(),
                dueDate: z.coerce.string().optional()
            })
        )
        .mutation(async ({ input }) => {
            await db
                .insert(tasks)
                .values({
                    id: ulid(),
                    taskListId: input.listId,
                    title: input.title,
                    details: input.details,
                    dueDate: input.dueDate ? new Date(input.dueDate) : undefined
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
                taskId: z.ulid(),
                title: z.string().optional(),
                completed: z.boolean().optional(),
                details: z.string().optional(),
                dueDate: z.date().optional()
            })
        )
        .mutation(async ({ input }) => {
            await db
                .update(tasks)
                .set({
                    title: input.title,
                    completed: input.completed,
                    details: input.details,
                    dueDate: input.dueDate
                })
                .where(eq(tasks.id, input.taskId))
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
                taskId: z.ulid()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await db
                .delete(tasks)
                .where(eq(tasks.id, input.taskId))
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        })
})

export { taskRouter }
