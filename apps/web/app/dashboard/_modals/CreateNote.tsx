import { useRouter } from 'next/navigation'

import { Button, Input, useModals } from '@sathene/ui-web'

import { toast } from 'sonner'
import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const createNoteSchema = z.object({
    title: z.string().min(3),
    content: z.string().optional()
})
type CreateNoteSchema = z.infer<typeof createNoteSchema>

export function DashboardCreateNoteModal() {
    const { closeAllModals } = useModals()
    const router = useRouter()

    const createNoteMutation = api.note.create.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: createNoteSchema
    })

    const handleCreateNote = (data: CreateNoteSchema) => {
        createNoteMutation.mutate(data, {
            onError: (err) => {
                toast.error(err.message)
            },
            onSuccess: (res) => {
                router.push(`/dashboard/notes/${res?.id}`)
                router.refresh()
                closeAllModals()
            }
        })
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateNote)}>
            <Input
                label="Title"
                type="text"
                required
                error={errors.title?.message}
                {...register('title')}
            />

            <div className="grid grid-cols-2 gap-4 w-full">
                <Button type="button" variant="outline" onClick={closeAllModals}>
                    Cancel
                </Button>

                <Button type="submit" loading={createNoteMutation.isLoading}>
                    Create
                </Button>
            </div>
        </form>
    )
}
