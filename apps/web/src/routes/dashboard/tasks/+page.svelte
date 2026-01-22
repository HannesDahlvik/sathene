<script lang="ts">
    import { onMount } from 'svelte'

    import { Button, Skeleton } from '@sathene/ui'

    import { api } from '$lib/api'
    import { openModal } from '$lib/stores/modals.svelte'
    import { clearToolbar, setToolbar } from '$lib/utils'
    import { createQuery } from '@tanstack/svelte-query'

    import CreateTaskList from '../_modals/CreateTaskList.svelte'
    import TaskList from './_components/TaskList.svelte'

    const taskPageData = createQuery(() => ({
        queryKey: ['taskPage'],
        queryFn: async () => await api.task.page.query()
    }))

    onMount(() => {
        setToolbar(toolbar, 'Tasks')

        return () => {
            clearToolbar()
        }
    })
</script>

{#snippet toolbar()}
    <div class="flex space-x-3">
        <Button
            variant="outline"
            onclick={() =>
                openModal({
                    modal: CreateTaskList,
                    title: 'Create List'
                })}
        >
            Create list
        </Button>
    </div>
{/snippet}

<div class="flex w-full flex-wrap justify-center gap-3 p-6">
    {#if taskPageData.isLoading}
        {#each Array.from({ length: 6 }) as _}
            <Skeleton class="h-60 w-96" />
        {/each}
    {:else if taskPageData.error}
        <p>Error loading task lists: {taskPageData.error.message}</p>
    {:else}
        {#each taskPageData.data as list}
            <TaskList
                {list}
                completedTasks={list.tasks.completed}
                incompletedTasks={list.tasks.incompleted}
            />
        {/each}
    {/if}
</div>
