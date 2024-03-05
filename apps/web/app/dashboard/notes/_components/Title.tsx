'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import type { Note } from '@sathene/db'
import { Input } from '@sathene/ui-web'

import { useDebounce } from '@uidotdev/usehooks'
import { toast } from 'sonner'
import { z } from 'zod'
import { api } from '~/lib/api'

const editTitleSchema = z.object({
    title: z.string().min(3)
})
type EditTitleSchema = z.infer<typeof editTitleSchema>

interface Props {
    note: Note
}

export function DashboardNotesTitle({ note }: Props) {
    const router = useRouter()

    const editNoteMutation = api.note.edit.useMutation()

    const [title, setTitle] = useState(note.title)
    const newTitle = useDebounce(title, 750)

    useEffect(() => {
        const { success } = editTitleSchema.safeParse({
            title: newTitle
        })

        if (success && note.title !== title) {
            handleEditNote({
                title: newTitle
            })
        }
    }, [newTitle])

    const handleEditNote = (data: EditTitleSchema) => {
        editNoteMutation.mutate(
            {
                noteId: note.id,
                title: data.title
            },
            {
                onError: (err) => {
                    toast.error(err.message, {
                        position: 'bottom-right'
                    })
                },
                onSuccess: () => {
                    router.refresh()
                    toast.info('Saved title', {
                        position: 'bottom-right'
                    })
                }
            }
        )
    }

    return (
        <Input
            className="h-16 px-4 py-4 text-2xl font-bold"
            type="text"
            defaultValue={note.title}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
        />
    )
}
