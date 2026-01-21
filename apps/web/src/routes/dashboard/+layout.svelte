<script lang="ts">
    import { type Snippet, setContext } from 'svelte'

    import { goto } from '$app/navigation'
    import { authClient } from '$lib/api'
    import type { DashboardToolbarCtx, DashboardToolbarTitleCtx } from '$lib/types'
    import { LoaderCircle } from '@lucide/svelte'

    import Sidebar from './_components/Sidebar.svelte'

    const auth = authClient.useSession()

    let { children } = $props()

    let toolbar = $state<Snippet | null>(null)
    let toolbarTitle = $state<string>('')

    setContext<DashboardToolbarCtx>('dashboard-toolbar', {
        setToolbar: (snippet) => (toolbar = snippet),
        clearToolbar: () => (toolbar = null)
    })

    setContext<DashboardToolbarTitleCtx>('dashboard-toolbar-title', {
        setToolbarTitle: (title) => (toolbarTitle = title),
        clearToolbarTitle: () => (toolbarTitle = '')
    })

    $effect(() => {
        if (!$auth.isPending && !$auth.data) {
            goto('/signin', {
                replaceState: true
            })
        }
    })
</script>

<svelte:head>
    <title>Sathene - Dashboard</title>
</svelte:head>

{#if !$auth.data}
    <div class="flex h-screen items-center justify-center">
        <LoaderCircle class="text-primary animate-spin" size="32" />
    </div>
{:else}
    <div class="dashboard-grid">
        <Sidebar />

        {#if toolbar}
            <div class="dashboard-toolbar border-b-border flex w-full items-center border-b p-6">
                <p class="mr-6 text-lg font-semibold">{toolbarTitle}</p>

                {@render toolbar()}
            </div>
        {/if}

        <div class="dashboard-content">
            {@render children()}
        </div>
    </div>
{/if}
