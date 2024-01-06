'use client'

import { useRouter } from 'next/navigation'

import { dayjs } from '@sathene/dayjs'
import { type Task } from '@sathene/db'
import {
    Button,
    Checkbox,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    useModals,
    useToast
} from '@sathene/ui-web'

import { DashboardEditTaskModal } from '../../_modals/EditTask'
import { Loader2, MoreVertical, Pen, Trash } from 'lucide-react'
import { z } from 'zod'
import { api } from '~/lib/api'

const toggleCompletedSchema = z.object({
    title: z.string().optional(),
    completed: z.boolean().optional(),
    deadline: z.date().optional(),
    details: z.string().optional()
})
type ToggleCompletedSchema = z.infer<typeof toggleCompletedSchema>

interface Props {
    task: Task
}

export function DashboardTasksTaskItem({ task }: Props) {
    const { toast } = useToast()
    const router = useRouter()
    const { openModal } = useModals()

    const toggleCompletedMutation = api.task.edit.useMutation()
    const deleteTaskMutation = api.task.delete.useMutation()

    const handleEditTask = (data: ToggleCompletedSchema) => {
        toggleCompletedMutation.mutate(
            {
                taskId: task.id,
                ...data
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
                    router.refresh()
                }
            }
        )
    }

    const handleDeleteTask = () => {
        deleteTaskMutation.mutate(
            {
                taskId: task.id
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
                    router.refresh()
                    toast({
                        title: 'Success',
                        description: `Successfully deleted "${task.title}"`
                    })
                }
            }
        )
    }

    return (
        <div className="grid grid-cols-[48px_1fr_1fr_48px] items-center p-4 bg-muted border rounded-lg">
            <Checkbox
                className="h-6 w-6"
                checked={task.completed}
                onClick={() =>
                    handleEditTask({
                        completed: !task.completed
                    })
                }
            />

            <p className="text-lg font-bold">{task.title}</p>

            <p>{dayjs(task.deadline).format('DD/MM/YYYY - HH:mm')}</p>

            <div className="ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <MoreVertical size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <button
                                className="flex justify-between w-full"
                                onClick={() => {
                                    openModal({
                                        title: 'Edit task',
                                        children: <DashboardEditTaskModal task={task} />
                                    })
                                }}
                            >
                                Edit <Pen size={16} />
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button
                                className="flex justify-between w-full text-destructive"
                                onClick={handleDeleteTask}
                            >
                                Delete <Trash size={16} />
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
