import { db, eq, note } from '@sathene/db'

import { TRPCError } from '@trpc/server'
import { ulid } from 'ulid'
import z from 'zod'

import { authProcedure, router } from '../trpc.js'

export const noteRouter = router({
    page: authProcedure.query(async ({ ctx }) => {
        const notes = await db.query.note
            .findMany({
                where: (note, { eq }) => eq(note.userId, ctx.session.userId),
                orderBy: (note, { desc }) => [desc(note.updatedAt)]
            })
            .catch((err) => {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: err.message
                })
            })

        return notes
    }),
    getNoteById: authProcedure.input(z.object({ noteId: z.ulid() })).query(async ({ input }) => {
        const note = await db.query.note
            .findFirst({
                where: (note, { eq }) => eq(note.id, input.noteId)
            })
            .catch((err) => {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: err.message
                })
            })

        return note
    }),
    create: authProcedure
        .input(
            z.object({
                title: z.string(),
                content: z.string().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const noteId = ulid()

            const newNote = await db
                .insert(note)
                .values({
                    id: noteId,
                    userId: ctx.session.userId,
                    title: input.title,
                    content: input.content || ''
                })
                .returning()
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            return newNote[0]
        }),
    edit: authProcedure
        .input(
            z.object({
                noteId: z.ulid(),
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
    delete: authProcedure
        .input(
            z.object({
                noteId: z.ulid()
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
