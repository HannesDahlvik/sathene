import type { PropsWithChildren } from 'react'

import type { Metadata } from 'next'

import { DashboardTasksWrapper } from './_components/Wrapper'
import { caller } from '~/lib/caller'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Tasks'
}

export default async function DashboardTasksLayout({ children }: PropsWithChildren) {
    const taskLists = await caller.task.list.all()

    return (
        <div className="flex flex-col gap-4 h-full p-8">
            <div className="flex items-center gap-4">
                <h2>Tasks</h2>
            </div>

            <DashboardTasksWrapper lists={taskLists} />

            <div className="overflow-scroll">{children}</div>
        </div>
    )
}
