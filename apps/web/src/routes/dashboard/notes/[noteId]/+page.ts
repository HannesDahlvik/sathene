import { api } from '$lib/api.js'

export async function load({ params }) {
    let error: Error | null = null

    const note = await api.note.getNoteById
        .query({
            noteId: params.noteId
        })
        .catch((err) => (error = err))

    return {
        note,
        error
    }
}
