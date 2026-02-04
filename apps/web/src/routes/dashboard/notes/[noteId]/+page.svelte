<script lang="ts">
    import { onMount } from 'svelte'

    import { Button, DropdownMenu } from '@sathene/ui'

    import { goto } from '$app/navigation'
    import { api } from '$lib/api'
    import { closeAllAlerts, openAlert } from '$lib/stores/alerts.svelte'
    import { clearToolbar, errorHandler, infoHandler, setToolbar } from '$lib/utils'
    import { ArrowLeft, EllipsisVerticalIcon, Trash } from '@lucide/svelte'
    import { createMutation, useQueryClient } from '@tanstack/svelte-query'
    import type { Editor } from '@tiptap/core'
    import z from 'zod'

    import EditorComponent from '../_components/Editor.svelte'
    import type { PageProps } from './$types'

    let { params, data: note }: PageProps = $props()

    const queryClient = useQueryClient()

    let editor: Editor | null = $state(null)
    let newTitle = $state('')

    const schema = z.object({
        title: z.string().min(3),
        content: z.string().optional()
    })

    const saveNoteMutation = createMutation(() => ({
        mutationFn: async (data: z.infer<typeof schema>) => {
            const validatedData = schema.parse(data)
            return await api.note.edit.mutate({
                noteId: params.noteId,
                title: validatedData.title,
                content: validatedData.content
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notePage', 'note'] })
        }
    }))

    $effect(() => {
        newTitle = note?.title || ''
    })

    onMount(() => {
        setToolbar(toolbar, '')

        return () => {
            clearToolbar()
        }
    })

    function handleSaveNote() {
        const noteHTML = editor?.getHTML()

        if (noteHTML === undefined) {
            throw errorHandler(new Error('Editor is not initialized.'))
        }

        saveNoteMutation.mutate(
            {
                title: newTitle ?? note.title,
                content: noteHTML
            },
            {
                onSuccess: () => {
                    infoHandler('Note saved!')
                },
                onError: (error) => {
                    errorHandler(error)
                }
            }
        )
    }

    function handleDeleteNote() {
        if (!params.noteId) {
            throw errorHandler(new Error('Note ID is required to delete the note.'))
        }

        api.note.delete
            .mutate({ noteId: params.noteId })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['notePage', 'note'] })
                infoHandler('Note deleted!')
                goto('/dashboard/notes')
            })
            .catch((err) => {
                throw errorHandler(err)
            })
    }
</script>

{#snippet toolbar()}
    <div class="flex w-full items-center justify-between gap-6">
        <div class="flex items-center gap-6">
            <a href="/dashboard/notes">
                <ArrowLeft />
            </a>

            <input
                class="border-none bg-transparent text-2xl font-bold ring-0 outline-none focus:ring-0"
                type="text"
                bind:value={newTitle}
            />
        </div>

        <div class="flex items-center gap-3">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="ghost" size="icon">
                        <EllipsisVerticalIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="start">
                    <DropdownMenu.Item
                        onclick={() =>
                            openAlert({
                                title: 'Delete Note',
                                description:
                                    'Are you sure you want to delete this note? This action cannot be undone.',
                                labels: {
                                    action: 'Delete',
                                    cancel: 'Cancel'
                                },
                                onConfirm: () => {
                                    handleDeleteNote()
                                    closeAllAlerts()
                                }
                            })}
                    >
                        <Trash /> Delete
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>

            <Button variant="outline" onclick={handleSaveNote}>Save</Button>
        </div>
    </div>
{/snippet}

<div class="flex items-center justify-center p-6">
    <div class="w-xl">
        <EditorComponent onEditor={(newEditor) => (editor = newEditor)} noteHTML={note.content} />
    </div>
</div>
