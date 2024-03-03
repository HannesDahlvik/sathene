'use client'

import { useRouter } from 'next/navigation'

import type { TaskList } from '@sathene/db'
import { Button, Input, useModals } from '@sathene/ui-web'

import { toast } from 'sonner'
import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const renameTaskListSchema = z.object({
    title: z.string().min(3)
})
type RenameTaskListSchema = z.infer<typeof renameTaskListSchema>

interface Props {
    taskList: TaskList
}

export function DashboardRenameTaskList({ taskList }: Props) {
    const { closeAllModals } = useModals()
    const router = useRouter()

    const renameTaskListMutation = api.task.list.rename.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: renameTaskListSchema,
        defaultValues: {
            title: taskList.name
        }
    })

    const handleRenameTaskList = (data: RenameTaskListSchema) => {
        renameTaskListMutation.mutate(
            {
                listId: taskList.id,
                newName: data.title
            },
            {
                onError: (err) => {
                    toast.error(err.message)
                },
                onSuccess: () => {
                    router.refresh()
                    closeAllModals()
                }
            }
        )
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRenameTaskList)}>
            <Input
                label="New Name"
                type="text"
                required
                autoFocus
                error={errors.title?.message}
                {...register('title')}
            />

            <div className="grid grid-cols-2 gap-4 w-full">
                <Button type="button" variant="outline" onClick={closeAllModals}>
                    Cancel
                </Button>

                <Button type="submit" loading={renameTaskListMutation.isLoading}>
                    Rename
                </Button>
            </div>
        </form>
    )
}
