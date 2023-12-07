import type { PropsWithChildren } from 'react'

import { redirect } from 'next/navigation'

import { getServerSession } from '@sathene/api'

import { DashboardSidebar } from './_components/Sidebar'

export default async function DashboardLayout({ children }: PropsWithChildren) {
    const session = await getServerSession()

    if (!session) return redirect('/login')

    return (
        <div className="grid h-screen w-full grid-cols-[275px_1fr]">
            <DashboardSidebar />

            <div className="h-screen p-6">
                <div className="h-full bg-accent border rounded-xl overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}
