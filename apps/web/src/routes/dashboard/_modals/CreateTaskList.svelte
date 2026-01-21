<script lang="ts">
    import { Button, Input, buttonVariants } from '@sathene/ui'
    import { Dialog } from '@sathene/ui'

    import { api } from '$lib/api'
    import { closeAllModals } from '$lib/modals.svelte'
    import { errorHandler } from '$lib/utils'
    import { useQueryClient } from '@tanstack/svelte-query'
    import z from 'zod'

    const queryClient = useQueryClient()

    const schema = z.object({
        name: z.string().min(1)
    })

    let loading = $state(false)

    function handleCreateTaskList(e: SubmitEvent) {
        e.preventDefault()
        loading = true

        const form = new FormData(e.target as HTMLFormElement)
        const result = schema.safeParse(Object.fromEntries(form))

        if (!result.success) {
            loading = false
            throw errorHandler(result.error)
        }

        api.task.list.create
            .mutate({
                name: result.data.name
            })
            .then(() => {
                loading = false
                queryClient.invalidateQueries({ queryKey: ['taskPage'] })
                closeAllModals()
            })
            .catch((error) => {
                loading = false
                errorHandler(error)
            })
    }
</script>

<form class="space-y-4" onsubmit={handleCreateTaskList}>
    <Input label="Name" type="text" placeholder="My tasks" required />

    <Dialog.Footer>
        <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
        <Button type="submit" variant="secondary" {loading}>Create</Button>
    </Dialog.Footer>
</form>
