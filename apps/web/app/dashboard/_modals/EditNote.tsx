import { useRouter } from 'next/navigation'

import type { Note } from '@sathene/db'
import { Button, Input, useModals } from '@sathene/ui-web'

import { toast } from 'sonner'
import { z } from 'zod'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const editNoteSchema = z.object({
    title: z.string().min(3),
    content: z.string().nullish()
})
type EditNoteSchema = z.infer<typeof editNoteSchema>

interface Props {
    note: Note
}

export function DashboardEditNoteModal({ note }: Props) {
    const { closeAllModals } = useModals()
    const router = useRouter()

    const editNoteMutation = api.note.edit.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: editNoteSchema,
        defaultValues: {
            title: note.title,
            content: note.content
        }
    })

    const handleEditNote = (data: EditNoteSchema) => {
        editNoteMutation.mutate(data, {
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleEditNote)}>
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

                <Button type="submit" loading={editNoteMutation.isLoading}>
                    Save
                </Button>
            </div>
        </form>
    )
}
