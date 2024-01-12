'use client'

import { useRouter } from 'next/navigation'

import { Button, Input, useModals, useToast } from '@sathene/ui-web'

import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const createTaskSchema = z.object({
    title: z.string().min(3),
    details: z.string().optional(),
    deadline: z.coerce.string().optional()
})
type CreateTaskSchema = z.infer<typeof createTaskSchema>

interface Props {
    listId: string
}

export function DashboardCreateTaskModal({ listId }: Props) {
    const { closeAllModals } = useModals()
    const { toast } = useToast()
    const router = useRouter()

    const createTaskMutation = api.task.create.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: createTaskSchema
    })

    const handleCreateTask = (data: CreateTaskSchema) => {
        createTaskMutation.mutate(
            {
                listId,
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateTask)}>
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
                    required: false
                })}
            />

            <div className="grid grid-cols-2 gap-4 w-full">
                <Button type="button" variant="outline" onClick={closeAllModals}>
                    Cancel
                </Button>

                <Button type="submit" loading={createTaskMutation.isLoading}>
                    Create
                </Button>
            </div>
        </form>
    )
}
