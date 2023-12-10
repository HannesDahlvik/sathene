'use client'

import { useRouter } from 'next/navigation'

import { dayjs } from '@sathene/dayjs'
import { type Task } from '@sathene/db'
import { Button, Checkbox, useToast } from '@sathene/ui-web'

import { Loader2, Trash } from 'lucide-react'
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

    const toggleCompletedMutation = api.tasks.edit.useMutation()
    const deleteTaskMutation = api.tasks.delete.useMutation()

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
        <div className="grid grid-cols-[80px_1fr_1fr_40px] items-center gap-6 px-8 py-4 bg-muted border rounded-lg">
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

            <p>{dayjs(task.deadline).format('D/MM/YYYY - HH:mm')}</p>

            <div className="ml-auto">
                <Button
                    variant="outline"
                    size="icon"
                    disabled={deleteTaskMutation.isLoading}
                    onClick={handleDeleteTask}
                >
                    {deleteTaskMutation.isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Trash className="text-destructive/75" size={20} />
                    )}
                </Button>
            </div>
        </div>
    )
}
