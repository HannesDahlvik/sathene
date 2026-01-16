<script lang="ts">
    import Sidebar from './_components/Sidebar.svelte'

    let { children } = $props()
</script>

<div class="flex h-screen">
    <Sidebar />

    {@render children()}
</div>
