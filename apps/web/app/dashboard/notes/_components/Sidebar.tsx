'use client'

import type { Note } from '@sathene/db'
import { Button, useModals } from '@sathene/ui-web'

import { DashboardCreateNoteModal } from '../../_modals/CreateNote'
import { DashboardNotesSidebarLink } from './SidebarLink'

interface Props {
    notes: Note[]
}

export function DashboardNotesSidebar({ notes }: Props) {
    const { openModal } = useModals()

    const handleCreateNote = () => {
        openModal({
            title: 'Create note',
            children: <DashboardCreateNoteModal />
        })
    }

    return (
        <div className="flex flex-col bg-accent border-r overflow-auto">
            <div className="w-full p-4">
                <Button className="w-full" onClick={handleCreateNote}>
                    Create note
                </Button>
            </div>

            <div className="flex flex-col gap-2 overflow-scroll">
                {notes.map((note) => (
                    <DashboardNotesSidebarLink note={note} key={note.id} />
                ))}
            </div>
        </div>
    )
}
