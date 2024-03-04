'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import type { Note } from '@sathene/db'
import { Button, cn, useAlerts, useModals } from '@sathene/ui-web'

import { DashboardCreateNoteModal } from '../../_modals/CreateNote'
import { DashboardEditNoteModal } from '../../_modals/EditNote'
import { useHover } from '@uidotdev/usehooks'
import { Pen, Plus, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '~/lib/api'

interface Props {
    note?: Note
}

export function DashboardNoteCard({ note }: Props) {
    const router = useRouter()

    const { openModal } = useModals()
    const { openAlert } = useAlerts()
    const [ref, hovering] = useHover()

    const deleteNoteMutation = api.note.delete.useMutation()

    const handleCreateNote = () => {
        if (!note) {
            openModal({
                title: 'Create note',
                children: <DashboardCreateNoteModal />
            })
        }
    }

    const handleEditNote = () => {
        if (note) {
            openModal({
                title: 'Edit note',
                children: <DashboardEditNoteModal note={note} />
            })
        }
    }

    const handleDeleteNote = () => {
        if (note) {
            openAlert({
                title: `Are you sure to delete the note "${note.title}"?`,
                description: 'This action is not reversible.',
                labels: {
                    action: 'Delete'
                },
                onSuccess: () => {
                    deleteNoteMutation.mutate(note.id, {
                        onError: (err) => {
                            toast.error(err.message)
                        },

                        onSuccess: () => {
                            router.refresh()
                            toast.success(`Successfully deleted "${note.title}"`)
                        }
                    })
                }
            })
        }
    }

    const Comp = note ? 'div' : 'button'

    return (
        <Comp
            className={cn(
                'relative flex flex-col justify-center items-center h-40 border rounded-md cursor-pointer duration-300 hover:bg-accent/50 hover:border-foreground',
                note ? 'w-60' : 'w-40'
            )}
            ref={ref}
        >
            {note && hovering && (
                <div className="absolute top-0 right-0 flex justify-end gap-2 w-full p-2">
                    <Button size="xs" variant="outline" onClick={handleEditNote}>
                        <Pen size={16} />
                    </Button>
                    <Button size="xs" variant="outline" onClick={handleDeleteNote}>
                        <Trash size={16} />
                    </Button>
                </div>
            )}

            {!note ? (
                <div
                    className="flex justify-center items-center h-full w-full"
                    onClick={handleCreateNote}
                >
                    <Plus size={32} />
                </div>
            ) : (
                <Link
                    href={`/dashboard/notes/${note.id}`}
                    className="flex justify-center items-center align-middle h-full w-full"
                >
                    <h5 className="text-center">{note.title}</h5>
                </Link>
            )}
        </Comp>
    )
}
