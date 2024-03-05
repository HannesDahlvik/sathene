'use client'

import { Button, Separator } from '@sathene/ui-web'

import { Editor, useCurrentEditor } from '@tiptap/react'
import {
    Bold,
    Code,
    Heading,
    Italic,
    List,
    ListOrdered,
    Quote,
    Save,
    Strikethrough
} from 'lucide-react'
import { toast } from 'sonner'
import { api } from '~/lib/api'

interface Props {
    editor: Editor
    noteId: string
}

export function DashboardNotesEditorToolbar({ editor, noteId }: Props) {
    const editNoteMutation = api.note.edit.useMutation()

    const handleSaveNote = () => {
        const noteHTML = editor?.getHTML()

        editNoteMutation.mutate(
            {
                noteId,
                content: noteHTML
            },
            {
                onError: (err) => {
                    toast.error(err.message, {
                        position: 'bottom-right'
                    })
                },
                onSuccess: () => {
                    toast.info('Saved note!', {
                        position: 'bottom-right'
                    })
                }
            }
        )
    }

    if (!editor) return null

    return (
        <div className="flex items-center gap-1 bg-primary/75 text-primary-foreground p-2 rounded-md h-14 w-full backdrop-blur-sm">
            <Button
                size="sm"
                variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold />
            </Button>

            <Button
                size="sm"
                variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic />
            </Button>

            <Button
                size="sm"
                variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough />
            </Button>

            <Button
                size="sm"
                variant={editor.isActive('code') ? 'secondary' : 'ghost'}
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <Code />
            </Button>

            <Separator orientation="vertical" className="h-4 mx-2" />

            <Button
                size="sm"
                variant={editor.isActive('heading') ? 'secondary' : 'ghost'}
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                <Heading />
            </Button>

            <Button
                size="sm"
                variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List />
            </Button>

            <Button
                size="sm"
                variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered />
            </Button>

            <Button
                size="sm"
                variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote />
            </Button>

            <Button
                size="sm"
                variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                <Code />
            </Button>

            <Button
                className="ml-auto"
                variant="secondary"
                loading={editNoteMutation.isLoading}
                onClick={handleSaveNote}
            >
                <Save size={20} className="mr-2" /> Save
            </Button>
        </div>
    )
}
