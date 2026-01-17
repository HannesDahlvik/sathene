<script lang="ts">
    import { goto } from '$app/navigation'
    import { authClient } from '$lib/api'
    import { LoaderCircle } from '@lucide/svelte'

    import Sidebar from './_components/Sidebar.svelte'

    let { children } = $props()

    const auth = authClient.useSession()

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

        {@render children()}
    </div>
{/if}
