<script lang="ts">
    import { onMount } from 'svelte'

    import { api, authClient } from '$lib/api'
    import { clearToolbar, setToolbar } from '$lib/utils'
    import { createQuery } from '@tanstack/svelte-query'

    const auth = authClient.useSession()

    const query = createQuery(() => ({
        queryKey: ['overview'],
        queryFn: async () => await api.overview.data.query()
    }))

    onMount(() => {
        setToolbar(toolbar, '')

        return () => {
            clearToolbar()
        }
    })
</script>

{#snippet toolbar()}
    <div class="flex w-full space-x-3">
        <p class="text-lg font-semibold">Greetings, {$auth.data?.user.name}!</p>

        <p class="ml-auto">{new Date().toLocaleString()}</p>
    </div>
{/snippet}

<div class="grid h-full w-full grid-cols-2 gap-3 p-6">
    <div class="rounded border p-3">
        <h4>Today's tasks</h4>

        <p>Task 1</p>
        <p>Task 2</p>
        <p>Task 3 (done)</p>

        <p class="mt-3">2 / 5 completed</p>
    </div>

    <div class="rounded border p-3">
        <h4>Upcoming events</h4>

        <p>Event 1 - Tomorrow at 10:00 AM</p>
        <p>Event 2 - Friday at 2:00 PM</p>
        <p>Event 3 - Next Monday at 9:00 AM</p>

        <a class="mt-2" href="/dashboard/calendar">View calendar</a>
    </div>

    <div class="rounded border p-3">
        <h4>Recent notes</h4>

        <p>Note title 1</p>
        <p>Note title 2</p>
        <p>Note title 3</p>
    </div>

    <div class="rounded border p-3">
        <h4>Quick stats</h4>

        <p>Tasks due today: 4</p>
        <p>Overdue tasks: 1</p>
        <p>Events this week: 5</p>
    </div>
</div>
