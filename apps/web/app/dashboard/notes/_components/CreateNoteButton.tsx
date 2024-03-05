'use client'

import { Button, useModals } from '@sathene/ui-web'

import { DashboardCreateNoteModal } from '../../_modals/CreateNote'

export function DashboardNotesCreateNoteButton() {
    const { openModal } = useModals()

    const handleCreateNote = () => {
        openModal({
            title: 'Create note',
            children: <DashboardCreateNoteModal />
        })
    }

    return (
        <div className="w-full p-4">
            <Button className="w-full" onClick={handleCreateNote}>
                Create note
            </Button>
        </div>
    )
}
