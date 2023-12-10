'use client'

import { Button, useModals } from '@sathene/ui-web'

import { DashboardCreateTaskModal } from '../../_components/_modals/CreateTask'

export function DashboardTasksCreateTaskButton() {
    const { openModal } = useModals()

    return (
        <Button
            onClick={() =>
                openModal({
                    title: 'Create task',
                    children: <DashboardCreateTaskModal />
                })
            }
        >
            Create
        </Button>
    )
}
