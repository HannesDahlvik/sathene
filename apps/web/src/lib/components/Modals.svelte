<script lang="ts">
    import { Dialog } from '@sathene/ui'

    import { type ModalSettings, getModals } from '$lib/modals.svelte'

    let modals: ModalSettings[] = $state([])
    $effect(() => {
        modals = getModals()
    })
</script>

{#each modals as modal}
    {@const Modal = modal.modal}

    <Dialog.Root open={modal.open} onOpenChange={modal.onOpenChange}>
        <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>{modal.title}</Dialog.Title>
                <Dialog.Description>
                    {modal.description}
                </Dialog.Description>
            </Dialog.Header>

            <Modal {...modal.modalProps}></Modal>
        </Dialog.Content>
    </Dialog.Root>
{/each}
