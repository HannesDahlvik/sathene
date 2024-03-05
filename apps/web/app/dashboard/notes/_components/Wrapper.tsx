'use client'

import type { Note } from '@sathene/db'

import { DashboardNotesEditorToolbar } from '../_components/EditorToolbar'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface Props {
    note: Note
}

export function DashboardNotesEditorWrapper({ note }: Props) {
    return (
        <div className="relative overflow-scroll">
            <EditorProvider
                editorProps={{
                    attributes: {
                        class: 'min-h-[600px] p-4 bg-secondary border rounded-md border-input outline-none'
                    }
                }}
                extensions={[StarterKit]}
                content={note.content}
            >
                <div className="sticky left-0 bottom-0 mt-8 px-4 w-full z-50">
                    <DashboardNotesEditorToolbar noteId={note.id} />
                </div>
            </EditorProvider>
        </div>
    )
}
