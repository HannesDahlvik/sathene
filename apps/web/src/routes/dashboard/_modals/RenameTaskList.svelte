<script lang="ts">
    import { Button, Input, buttonVariants } from '@sathene/ui'
    import { Dialog } from '@sathene/ui'

    import { api } from '$lib/api'
    import { closeAllModals } from '$lib/modals.svelte'
    import { errorHandler } from '$lib/utils'
    import { useQueryClient } from '@tanstack/svelte-query'
    import z from 'zod'

    let { listId, existingName }: { listId: string; existingName: string } = $props()

    const queryClient = useQueryClient()

    const schema = z.object({
        listId: z.ulid(),
        name: z.string().min(1)
    })

    let loading = $state(false)

    function handleRenameTaskList(e: SubmitEvent) {
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

        api.task.list.edit
            .mutate({
                listId,
                name: result.data.name
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

<form class="space-y-4" onsubmit={handleRenameTaskList}>
    <Input label="Name" type="text" placeholder="My tasks" defaultValue={existingName} required />

    <Dialog.Footer>
        <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
        <Button type="submit" variant="secondary" {loading}>Rename</Button>
    </Dialog.Footer>
</form>
