<script lang="ts">
    import { onMount } from 'svelte'

    import { Button, Skeleton } from '@sathene/ui'

    import { api } from '$lib/api'
    import { openModal } from '$lib/stores/modals.svelte'
    import { clearToolbar, setToolbar } from '$lib/utils'
    import { createQuery } from '@tanstack/svelte-query'

    import CreateNote from '../_modals/CreateNote.svelte'

    const notesPageData = createQuery(() => ({
        queryKey: ['notePage'],
        queryFn: async () => await api.note.page.query()
    }))

    onMount(() => {
        setToolbar(toolbar, 'Notes')

        return () => {
            clearToolbar()
        }
    })
</script>

{#snippet toolbar()}
    <div class="flex space-x-3">
        <Button variant="outline" href="/dashboard/notes/new">New note</Button>
    </div>
{/snippet}

<div class="flex w-full flex-wrap justify-center gap-3 p-6">
    {#if notesPageData.isLoading}
        {#each Array(6) as _}
            <Skeleton class="h-60 w-96" />
        {/each}
    {:else if notesPageData.error}
        <p>Error loading notes: {notesPageData.error.message}</p>
    {:else if notesPageData.data}
        {#if notesPageData.data.length === 0}
            <p>No notes found.</p>
        {/if}

        {#each notesPageData.data as note}
            <div class="h-60 w-96 rounded border border-gray-300 bg-white p-4 shadow">
                <p>{note.title}</p>
            </div>
        {/each}
    {/if}
</div>
