import { DashboardNotesCreateNoteButton } from './CreateNoteButton'
import { DashboardNotesSidebarLink } from './SidebarLink'
import { caller } from '~/lib/caller'

export async function DashboardNotesSidebar() {
    const notes = await caller.note.all()

    return (
        <div className="flex flex-col bg-accent border-r overflow-auto">
            <DashboardNotesCreateNoteButton />

            <div className="flex flex-col gap-2 overflow-scroll">
                {notes.map((note) => (
                    <DashboardNotesSidebarLink note={note} key={note.id} />
                ))}
            </div>
        </div>
    )
}
