<script lang="ts">
    import { ModeWatcher, Toaster } from '@sathene/ui'

    import favicon from '$lib/assets/favicon.svg'
    import Alerts from '$lib/components/Alerts.svelte'
    import Modals from '$lib/components/Modals.svelte'
    import { QueryClientProvider } from '@tanstack/svelte-query'

    import '../app.css'

    let { children, data } = $props()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Toaster position="top-right" />

<ModeWatcher />

<QueryClientProvider client={data.queryClient}>
    <Alerts />

    <Modals />

    {@render children()}
</QueryClientProvider>
