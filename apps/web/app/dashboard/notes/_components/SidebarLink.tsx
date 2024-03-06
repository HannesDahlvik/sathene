'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { dayjs } from '@sathene/dayjs'
import type { Note } from '@sathene/db'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    cn,
    useAlerts,
    useModals
} from '@sathene/ui-web'

import { DashboardEditNoteModal } from '../../_modals/EditNote'
import { MoreVertical, Pen, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '~/lib/api'

interface Props {
    note: Note
}

export function DashboardNotesSidebarLink({ note }: Props) {
    const router = useRouter()
    const pathname = usePathname()

    const { openModal } = useModals()
    const { openAlert } = useAlerts()

    const deleteNoteMutation = api.note.delete.useMutation()

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
                    deleteNoteMutation.mutate(
                        {
                            noteId: note.id
                        },
                        {
                            onError: (err) => {
                                toast.error(err.message)
                            },

                            onSuccess: () => {
                                router.refresh()
                                toast.success(`Successfully deleted "${note.title}"`)
                            }
                        }
                    )
                }
            })
        }
    }

    return (
        <Link
            className={cn(
                'flex justify-between items-center mb-0.5 mx-4 p-2 rounded-lg',
                pathname.includes(note.id) ? 'bg-primary/10 text-foreground' : 'hover:bg-primary/10'
            )}
            href={`/dashboard/notes/${note.id}`}
            key={note.id}
        >
            <div className="flex flex-col">
                <p className="font-bold mb-2">{note.title}</p>

                <p className="text-foreground/75">{dayjs(note.createdAt).format('DD.MM.YYYY')}</p>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleEditNote}>
                        <Pen size={16} />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-500 hover:!text-red-500"
                        onClick={handleDeleteNote}
                    >
                        <Trash size={16} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Link>
    )
}
