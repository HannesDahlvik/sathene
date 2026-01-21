<script lang="ts">
    import { type Tasks } from '@sathene/db'
    import { Checkbox } from '@sathene/ui'

    import { api } from '$lib/api'
    import { errorHandler } from '$lib/utils'
    import { useQueryClient } from '@tanstack/svelte-query'

    let { task }: { task: Tasks } = $props()

    const queryClient = useQueryClient()

    function handleCheckedChange(checked: boolean) {
        api.task.edit
            .mutate({
                taskId: task.id,
                completed: checked
            })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['taskPage'] })
            })
            .catch((err) => {
                errorHandler(err)
            })
    }
</script>

<div class="flex w-full flex-col py-2">
    <div class="flex items-center space-x-2">
        <Checkbox
            class="rounded-full"
            checked={task.completed}
            onCheckedChange={handleCheckedChange}
        />

        <p>{task.title}</p>
    </div>

    {#if task.details}
        <div class="ml-6">
            <p class="text-muted-foreground text-sm">{task.details}</p>
        </div>
    {/if}
</div>
