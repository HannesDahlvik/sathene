import type { PropsWithChildren } from 'react'

import type { Metadata } from 'next'

import { DashboardNotesSidebar } from './_components/Sidebar'
import { caller } from '~/lib/caller'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Notes'
}

export default async function DashboardNotesLayout({ children }: PropsWithChildren) {
    const notes = await caller.note.all()

    return (
        <div className="relative grid grid-cols-[275px_1fr] h-screen">
            <DashboardNotesSidebar notes={notes} />

            {children}
        </div>
    )
}
