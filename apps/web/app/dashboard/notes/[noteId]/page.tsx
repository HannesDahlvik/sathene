import { redirect } from 'next/navigation'

import { Separator } from '@sathene/ui-web'

import { DashboardNotesTitle } from '../_components/Title'
import { DashboardNotesEditorWrapper } from '../_components/Wrapper'
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

    if (!note) {
        return redirect('/dashboard/notes')
    }

    return (
        <div className="grid grid-rows-[auto_1px_1fr_auto] min-h-screen w-full p-8">
            <DashboardNotesTitle note={note} />

            <Separator />

            <DashboardNotesEditorWrapper note={note} />
        </div>
    )
}
