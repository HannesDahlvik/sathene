<script lang="ts">
    import { onMount } from 'svelte'

    import { clearToolbar, setToolbar } from '$lib/utils'
    import { ArrowLeft } from '@lucide/svelte'
    import { useQueryClient } from '@tanstack/svelte-query'
    import z from 'zod'

    import Editor from '../_components/Editor.svelte'

    const queryClient = useQueryClient()

    const schema = z.object({
        title: z.string().min(3),
        content: z.string().optional()
    })

    let loading = $state(false)

    onMount(() => {
        setToolbar(toolbar, '')

        return () => {
            clearToolbar()
        }
    })
</script>

{#snippet toolbar()}
    <div class="flex items-center gap-6">
        <a href="/dashboard/notes">
            <ArrowLeft />
        </a>
        <h3>New Note</h3>
    </div>
{/snippet}

<div class="flex items-center justify-center p-6">
    <div class="w-xl">
        <Editor />
    </div>
</div>
