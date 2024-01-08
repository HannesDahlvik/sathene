'use client'

import { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import type { TaskList } from '@sathene/db'
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    useModals,
    useToast
} from '@sathene/ui-web'

import { DashboardCreateTaskModal } from '../../_modals/CreateTask'
import { DashboardCreateTaskListModal } from '../../_modals/CreateTaskList'
import { DashboardRenameTaskList } from '../../_modals/RenameTaskList'
import { MoreVertical, Plus } from 'lucide-react'
import { api } from '~/lib/api'

interface Props {
    lists: TaskList[]
}

export function DashboardTasksWrapper({ lists }: Props) {
    const router = useRouter()
    const pararms = useParams<{ listId: string }>()
    const { openModal } = useModals()
    const { toast } = useToast()

    const deleteListMutation = api.task.list.delete.useMutation()

    useEffect(() => {
        router.push(`/dashboard/tasks/${lists[0]?.id}`)
    }, [])

    const handleDeleteList = () => {
        deleteListMutation.mutate(
            {
                listid: pararms.listId
            },
            {
                onError: (err) => {
                    toast({
                        title: 'Error',
                        description: err.message,
                        variant: 'destructive'
                    })
                },
                onSuccess: () => {
                    router.push(`/dashboard/tasks/${lists[lists.length - 1]?.id}`)
                    router.refresh()
                    toast({
                        title: 'Success',
                        description: `Successfully deleted "${pararms.listId}"`
                    })
                }
            }
        )
    }

    return (
        <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-2">
                <Select
                    value={lists.find((list) => list.id === pararms.listId)?.id}
                    onValueChange={(val) => router.push(`/dashboard/tasks/${val}`)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        {lists.map((list) => (
                            <SelectItem value={list.id} key={list.id}>
                                {list.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MoreVertical size={20} />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() =>
                                openModal({
                                    title: 'Rename list',
                                    children: (
                                        <DashboardRenameTaskList
                                            taskList={
                                                lists.find(
                                                    (list) => list.id === pararms.listId
                                                ) as TaskList
                                            }
                                        />
                                    )
                                })
                            }
                        >
                            Rename list
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={lists.length === 1} onClick={handleDeleteList}>
                            Delete list
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

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

            <div className="flex items-center gap-2">
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
