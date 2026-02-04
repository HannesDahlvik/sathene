import { api } from '$lib/api'

export async function load({ params }) {
    const note = await api.note.getNoteById.query({
        noteId: params.noteId
    })

    return note
}
