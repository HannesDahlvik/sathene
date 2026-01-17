<script lang="ts">
    import { House } from '@lucide/svelte'

    const { children } = $props()
</script>

<a href="/" class="absolute top-10 left-10">
    <House />
</a>

<div class="flex h-screen items-center justify-center">
    <div class="bg-accent mx-2 w-sm rounded p-12">
        {@render children()}
    </div>
</div>
