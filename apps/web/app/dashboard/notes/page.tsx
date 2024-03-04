import { DashboardNoteCard } from './_components/Card'
import { caller } from '~/lib/caller'

export default async function DashboardNotesPage() {
    const notes = await caller.note.all()

    return (
        <div className="flex flex-col gap-4 h-full p-8">
            <div className="flex flex-wrap gap-4">
                <DashboardNoteCard />

                {notes.map((note) => (
                    <DashboardNoteCard note={note} key={note.id} />
                ))}
            </div>
        </div>
    )
}
