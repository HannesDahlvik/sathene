<script lang="ts">
    import { onMount } from 'svelte'

    import { errorHandler } from '$lib/utils'

    import type { PageProps } from './$types'

    let { data }: PageProps = $props()

    onMount(() => {
        if (data.error) {
            errorHandler(data.error)
        }
    })
</script>
