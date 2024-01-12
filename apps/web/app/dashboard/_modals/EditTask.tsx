import { useRouter } from 'next/navigation'

import type { Task } from '@sathene/db'
import { Button, Input, useModals, useToast } from '@sathene/ui-web'

import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const editTaskSchema = z.object({
    title: z.string().min(3),
    details: z.string().optional(),
    deadline: z.date().optional()
})
type EditTaskSchema = z.infer<typeof editTaskSchema>

interface Props {
    task: Task
}

export function DashboardEditTaskModal({ task }: Props) {
    const { closeAllModals } = useModals()
    const { toast } = useToast()
    const router = useRouter()

    const editTaskMutation = api.task.edit.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: editTaskSchema,
        defaultValues: {
            deadline: task.deadline ?? undefined,
            title: task.title,
            details: task.details ?? ''
        }
    })

    const handleEditTask = (data: EditTaskSchema) => {
        editTaskMutation.mutate(
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
                    closeAllModals()
                }
            }
        )
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleEditTask)}>
            <Input
                label="Title"
                type="text"
                required
                error={errors.title?.message}
                {...register('title')}
            />

            <Input
                label="Details"
                type="text"
                error={errors.details?.message}
                {...register('details')}
            />

            <Input
                label="Deadline"
                type="datetime-local"
                error={errors.deadline?.message}
                {...register('deadline', {
                    valueAsDate: true,
                    required: false
                })}
            />

            <div className="grid grid-cols-2 gap-4 w-full">
                <Button type="button" variant="outline" onClick={closeAllModals}>
                    Cancel
                </Button>

                <Button type="submit" loading={editTaskMutation.isLoading}>
                    Save
                </Button>
            </div>
        </form>
    )
}
