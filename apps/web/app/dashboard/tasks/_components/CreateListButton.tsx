'use client'

import { Button, useModals } from '@sathene/ui-web'

import { DashboardCreateTaskListModal } from '../../_modals/CreateTaskList'
import { Plus } from 'lucide-react'

export function DashboardTasksCreateTaskListButton() {
    const { openModal } = useModals()

    return (
        <Button
            size="icon"
            onClick={() =>
                openModal({
                    title: 'Create new list',
                    children: <DashboardCreateTaskListModal />
                })
            }
        >
            <Plus />
        </Button>
    )
}
