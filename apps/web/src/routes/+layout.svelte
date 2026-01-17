<script lang="ts">
    import { Toaster } from '@sathene/ui'

    import favicon from '$lib/assets/favicon.svg'
    import { checkTheme } from '$lib/theme.svelte.js'
    import { QueryClientProvider } from '@tanstack/svelte-query'

    import '../app.css'

    let { children, data } = $props()

    $effect(() => {
        checkTheme()
    })
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Toaster position="top-right" />

<QueryClientProvider client={data.queryClient}>
    {@render children()}
</QueryClientProvider>
