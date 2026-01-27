<script lang="ts">
    import { Button, Dialog, Input, buttonVariants } from '@sathene/ui'

    import { useQueryClient } from '@tanstack/svelte-query'
    import z from 'zod'

    const queryClient = useQueryClient()

    const schema = z.object({
        title: z.string().min(3),
        content: z.string().optional()
    })

    let loading = $state(false)
</script>

<form class="space-y-4">
    <Input label="Title" type="text" placeholder="Test" required />
    <Input label="Details" type="text" placeholder="Details about the task" />

    <Dialog.Footer>
        <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
        <Button type="submit" variant="secondary" {loading}>Create</Button>
    </Dialog.Footer>
</form>
