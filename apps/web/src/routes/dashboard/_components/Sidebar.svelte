<script lang="ts">
    import { Button, cn } from '@sathene/ui'

    import { page } from '$app/state'
    import { authClient } from '$lib/api'
    import { DASHBOARD_LINKS } from '$lib/consts'

    function handleLogout() {
        authClient.signOut()
    }
</script>

<div class="dashboard-sidebar border-r-border flex w-full flex-col border-r p-4">
    <div class="mt-2 mb-6 text-center">
        <a href="/" class="mr-2 text-2xl font-bold">Sathene</a>
    </div>

    <div class="mt-6 flex flex-col gap-2">
        {#each DASHBOARD_LINKS as link}
            {@const Icon = link.icon}
            {@const enabled = page.url.pathname.includes(link.href)}

            <a
                href={link.href}
                class={cn(
                    'text-muted-foreground relative flex items-center gap-2 rounded-md border border-transparent p-2 px-3',
                    enabled
                        ? 'bg-primary/25 text-primary-foreground border-primary before:bg-primary border before:absolute before:left-0 before:h-5 before:w-0.5 before:rounded-r'
                        : 'hover:bg-primary/25'
                )}
            >
                <Icon
                    strokeWidth="1.5"
                    size="20"
                    class={cn('mr-1', enabled ? 'text-primary' : 'text-muted-foreground')}
                />

                <p class="text-sm">{link.title}</p>
            </a>
        {/each}
    </div>

    <div class="mt-auto">
        <Button variant="outline" class="w-full" onclick={handleLogout}>Logout</Button>
    </div>
</div>
