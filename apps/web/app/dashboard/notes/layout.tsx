import type { PropsWithChildren } from 'react'

import type { Metadata } from 'next'

import { DashboardNotesSidebar } from './_components/Sidebar'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Notes'
}

export default function DashboardNotesLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative grid grid-cols-[275px_1fr] h-screen">
            {/* @ts-expect-error */}
            <DashboardNotesSidebar />

            {children}
        </div>
    )
}
