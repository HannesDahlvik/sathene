'use client'

import type { Note } from '@sathene/db'

import { DashboardNotesEditorToolbar } from '../_components/EditorToolbar'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface Props {
    note: Note
}

export function DashboardNotesEditorWrapper({ note }: Props) {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'h-full outline-none'
            }
        },
        extensions: [StarterKit],
        content: note.content
    })

    if (!editor) return null

    return (
        <>
            <EditorContent
                className="prose dark:prose-invert md:prose-lg w-full max-w-full overflow-scroll outline-none"
                editor={editor}
            />

            <div className="mt-8 w-full z-50">
                <DashboardNotesEditorToolbar editor={editor} noteId={note.id} />
            </div>
        </>
    )
}
