<script lang="ts">
    import { Button, Input, buttonVariants } from '@sathene/ui'
    import { Dialog } from '@sathene/ui'

    import { api } from '$lib/api'
    import { closeAllModals } from '$lib/modals.svelte'
    import { errorHandler } from '$lib/utils'
    import { useQueryClient } from '@tanstack/svelte-query'
    import z from 'zod'

    let { listId }: { listId: string } = $props()

    const queryClient = useQueryClient()

    const schema = z.object({
        listId: z.ulid(),
        title: z.string().min(3),
        details: z.string().optional(),
        dueDate: z.coerce.string().optional()
    })

    let loading = $state(false)

    function handleCreateTask(e: SubmitEvent) {
        e.preventDefault()
        loading = true

        const form = new FormData(e.target as HTMLFormElement)
        const result = schema.safeParse({
            listId,
            ...Object.fromEntries(form)
        })

        if (!result.success) {
            loading = false
            throw errorHandler(result.error)
        }

        api.task.create
            .mutate({
                listId,
                title: result.data.title,
                details: result.data.details,
                dueDate: result.data.dueDate ? new Date(result.data.dueDate) : undefined
            })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['taskPage'] })
                closeAllModals()
                loading = false
            })
            .catch((error) => {
                loading = false
                errorHandler(error)
            })
    }
</script>

<form class="space-y-4" onsubmit={handleCreateTask}>
    <Input label="Title" type="text" placeholder="Test" required />
    <Input label="Details" type="text" placeholder="Details about the task" />

    <Dialog.Footer>
        <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
        <Button type="submit" variant="secondary" {loading}>Create</Button>
    </Dialog.Footer>
</form>
