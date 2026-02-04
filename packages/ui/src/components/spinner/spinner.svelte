<script lang="ts">
    import type { ComponentProps } from 'svelte'

    import { LoaderCircleIcon } from '@lucide/svelte'

    import { cn } from '../../lib/utils.js'

    let { class: className, ...restProps }: ComponentProps<typeof LoaderCircleIcon> = $props()
</script>

<LoaderCircleIcon
    role="status"
    aria-label="Loading"
    class={cn('size-4 animate-spin', className)}
    {...restProps}
/>
