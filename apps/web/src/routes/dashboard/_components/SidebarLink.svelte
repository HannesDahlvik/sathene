<script lang="ts">
    import { cn } from '@sathene/ui'

    import { page } from '$app/state'
    import type { DashboardLink } from '$lib/consts'

    let { link } = $props<{ link: DashboardLink }>()
</script>

<a
    href={link.href}
    class={cn(
        'flex items-center gap-2 rounded-md p-2',
        page.url.pathname.includes(link.href)
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-primary/25'
    )}
>
    {@render link.icon({ class: 'h-5 w-5' })}
    <span>{link.title}</span>
</a>
