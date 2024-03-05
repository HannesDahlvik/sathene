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
            <EditorContent className="overflow-scroll outline-none mt-2 mb-4" editor={editor} />

            <div className="sticky left-0 bottom-0 w-full z-50">
                <DashboardNotesEditorToolbar editor={editor} noteId={note.id} />
            </div>
        </>
    )
}
