import { db, eq, note } from '@sathene/db'

import { createId } from '../lib/utils'
import { authedProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const noteRouter = router({
    all: authedProcedure.mutation(async ({ ctx }) => {
        const notes = await db.query.note.findMany({
            where: (note, { eq }) => eq(note.userId, ctx.user.id)
        })

        return notes
    }),
    create: authedProcedure
        .input(
            z.object({
                title: z.string(),
                content: z.string().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const noteId = createId()

            await db
                .insert(note)
                .values({
                    id: noteId,
                    title: input.title,
                    content: input.content,
                    userId: ctx.user.id
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            const newNote = await db.query.note
                .findFirst({
                    where: (note, { eq }) => eq(note.id, noteId)
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return newNote
        }),
    edit: authedProcedure
        .input(
            z.object({
                noteId: z.string().cuid2(),
                title: z.string().optional(),
                content: z.string().optional()
            })
        )
        .mutation(async ({ input }) => {
            await db
                .update(note)
                .set({
                    title: input.title,
                    content: input.content
                })
                .where(eq(note.id, input.noteId))
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
                noteId: z.string().cuid2()
            })
        )
        .mutation(async ({ input }) => {
            await db
                .delete(note)
                .where(eq(note.id, input.noteId))
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return null
        })
})
