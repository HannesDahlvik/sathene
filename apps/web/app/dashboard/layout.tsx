import type { PropsWithChildren } from 'react'

import { redirect } from 'next/navigation'

import { getServerSession } from '@sathene/api'

import { DashboardSidebar } from './_components/Sidebar'
import { DashboardTimeline } from './_components/Timeline'

export default async function DashboardLayout({ children }: PropsWithChildren) {
    const session = await getServerSession()

    if (!session) return redirect('/login')

    return (
        <div className="grid h-screen w-full grid-cols-[275px_1fr_400px]">
            <DashboardSidebar />

            <main className="overflow-auto">{children}</main>

            <div className="bg-accent border-l overflow-y-hidden">
                <DashboardTimeline />
            </div>
        </div>
    )
}
