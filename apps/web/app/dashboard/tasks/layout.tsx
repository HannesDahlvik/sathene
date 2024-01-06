import type { PropsWithChildren } from 'react'

import Link from 'next/link'

import { Button } from '@sathene/ui-web'

import { DashboardTasksCreateTaskListButton } from './_components/CreateListButton'
import { DashboardTasksWrapper } from './_components/Wrapper'
import { caller } from '~/lib/caller'

export default async function DashboardTasksLayout({ children }: PropsWithChildren) {
    const taskLists = await caller.task.lists()

    return (
        <div className="flex flex-col gap-4 h-full p-8">
            <div className="flex items-center gap-4">
                <h2>Tasks</h2>
            </div>

            <DashboardTasksWrapper lists={taskLists} />

            {children}
        </div>
    )
}
