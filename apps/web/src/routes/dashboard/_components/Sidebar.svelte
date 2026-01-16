<script lang="ts">
    import { DASHBOARD_LINKS } from '$lib/consts'

    import SidebarLink from './SidebarLink.svelte'
</script>

<div class="bg-accent border-r-border flex w-64 flex-col border-r p-4">
    <div class="mb-2">
        <a href="/" class="mr-2 text-2xl font-bold">Sathene</a>
    </div>

    <div class="flex flex-col gap-2">
        {#each DASHBOARD_LINKS as link}
            <SidebarLink {link} />
        {/each}
    </div>

    <div class="mt-auto"></div>
</div>
