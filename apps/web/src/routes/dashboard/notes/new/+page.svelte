<script lang="ts">
    import { onMount } from 'svelte'

    import { Button } from '@sathene/ui'

    import { goto } from '$app/navigation'
    import { api } from '$lib/api'
    import { clearToolbar, errorHandler, setToolbar } from '$lib/utils'
    import { ArrowLeft } from '@lucide/svelte'
    import { createMutation, useQueryClient } from '@tanstack/svelte-query'
    import type { Editor } from '@tiptap/core'
    import z from 'zod'

    import EditorComponent from '../_components/Editor.svelte'

    const queryClient = useQueryClient()

    let editor: Editor | null = $state(null)

    const schema = z.object({
        title: z.string().min(3),
        content: z.string().optional()
    })

    const createNoteMutation = createMutation(() => ({
        mutationFn: async (data: z.infer<typeof schema>) => {
            const validatedData = schema.parse(data)
            return await api.note.create.mutate(validatedData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notePage', 'note'] })
        }
    }))

    onMount(() => {
        setToolbar(toolbar, '')

        return () => {
            clearToolbar()
        }
    })

    function handleCreateNote() {
        const noteHTML = editor?.getHTML()

        if (noteHTML === undefined) {
            throw errorHandler(new Error('Editor is not initialized.'))
        }

        createNoteMutation.mutate(
            {
                title: 'Untitled Note',
                content: noteHTML
            },
            {
                onSuccess: (newNote) => {
                    goto(`/dashboard/notes/${newNote.id}`)
                },
                onError: (error) => {
                    errorHandler(error)
                }
            }
        )
    }
</script>

{#snippet toolbar()}
    <div class="flex w-full items-center justify-between gap-6">
        <div class="flex items-center gap-6">
            <a href="/dashboard/notes">
                <ArrowLeft />
            </a>

            <h3>New Note</h3>
        </div>

        <Button variant="outline" onclick={handleCreateNote}>Create</Button>
    </div>
{/snippet}

<div class="flex items-center justify-center p-6">
    <div class="w-xl">
        <EditorComponent onEditor={(newEditor) => (editor = newEditor)} />
    </div>
</div>
