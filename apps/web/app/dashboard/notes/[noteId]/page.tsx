import { caller } from '~/lib/caller'

interface Props {
    params: {
        noteId: string
    }
}

export default async function DashboardNotesNotePage({ params }: Props) {
    const note = await caller.note.getByNoteId({
        noteId: params.noteId
    })

    return (
        <div>
            <h3>{note?.title}</h3>

            <p>{note?.content}</p>
        </div>
    )
}
