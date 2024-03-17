'use client'

import { Button, Input } from '@sathene/ui-web'

import { toast } from 'sonner'
import { z } from 'zod'
import { useAuth } from '~/hooks/useAuth'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const editUserSchema = z.object({
    username: z.string().min(3)
})
type EditUserSchema = z.infer<typeof editUserSchema>

export default function DashboardSettingsProfilePage() {
    const { user } = useAuth()

    const editUserMutation = api.auth.edit.useMutation()

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors, isDirty }
    } = useZodForm({
        schema: editUserSchema,
        defaultValues: {
            username: user?.username
        }
    })

    const handleSaveProfile = (data: EditUserSchema) => {
        editUserMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Saved!')
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })

        reset(data)
    }

    return (
        <form className="flex flex-col gap-4 w-[400px]" onSubmit={handleSubmit(handleSaveProfile)}>
            <Input label="User ID" type="text" value={user?.id} readOnly />

            <Input
                label="Username"
                type="text"
                error={errors.username?.message}
                {...register('username')}
            />

            <div className="flex justify-end">
                <Button type="submit" loading={editUserMutation.isLoading} disabled={!isDirty}>
                    Save
                </Button>
            </div>
        </form>
    )
}
