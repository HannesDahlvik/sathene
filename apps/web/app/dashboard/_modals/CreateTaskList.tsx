import { useRouter } from 'next/navigation'

import { Button, Input, useModals } from '@sathene/ui-web'

import { toast } from 'sonner'
import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const createTaskListSchema = z.object({
    name: z.string().min(3)
})
type CreateTaskListSchema = z.infer<typeof createTaskListSchema>

export function DashboardCreateTaskListModal() {
    const { closeAllModals } = useModals()
    const router = useRouter()

    const createTaskListMutation = api.task.list.create.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: createTaskListSchema
    })

    const handleCreateTaskList = (data: CreateTaskListSchema) => {
        createTaskListMutation.mutate(data, {
            onError: (err) => {
                toast.error(err.message)
            },
            onSuccess: () => {
                router.refresh()
                closeAllModals()
            }
        })
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateTaskList)}>
            <Input
                label="Name"
                type="text"
                required
                error={errors.name?.message}
                {...register('name')}
            />

            <div className="grid grid-cols-2 gap-4 w-full">
                <Button type="button" variant="outline" onClick={closeAllModals}>
                    Cancel
                </Button>

                <Button type="submit" loading={createTaskListMutation.isLoading}>
                    Create
                </Button>
            </div>
        </form>
    )
}
