'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import type { TaskList } from '@sathene/db'
import { Button, useModals } from '@sathene/ui-web'

import { DashboardCreateTaskModal } from '../../_modals/CreateTask'
import { DashboardCreateTaskListModal } from '../../_modals/CreateTaskList'
import { Plus } from 'lucide-react'

interface Props {
    lists: TaskList[]
}

export function DashboardTasksWrapper({ lists }: Props) {
    const router = useRouter()
    const pararms = useParams<{ listId: string }>()
    const { openModal } = useModals()

    useEffect(() => {
        router.push(`/dashboard/tasks/${lists[0]?.id}`)
    }, [])

    return (
        <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-2">
                {lists.map((list) => (
                    <Button
                        variant={list.id === pararms.listId ? 'default' : 'outline'}
                        asChild
                        key={list.id}
                    >
                        <Link href={`/dashboard/tasks/${list.id}`}>{list.name}</Link>
                    </Button>
                ))}

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
            </div>

            <div className="flex items-center">
                <Button
                    onClick={() =>
                        openModal({
                            title: 'Create task',
                            children: <DashboardCreateTaskModal listId={pararms.listId} />
                        })
                    }
                >
                    Create Task
                </Button>
            </div>
        </div>
    )
}
