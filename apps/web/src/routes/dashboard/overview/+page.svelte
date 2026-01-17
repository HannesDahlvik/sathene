<script lang="ts">
    import { api } from '$lib/api'
    import { createQuery } from '@tanstack/svelte-query'

    const query = createQuery(() => ({
        queryKey: ['overview'],
        queryFn: async () => await api.overview.data.query()
    }))
</script>

<div class="w-full p-14">
    <h2>Overview</h2>
</div>
