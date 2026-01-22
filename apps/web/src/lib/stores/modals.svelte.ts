import { type DialogRootProps } from '@sathene/ui'

export type ModalSettings = Partial<DialogRootProps> &
    Partial<{
        title: string
        description: string
        modalId: string
        modal: any
        modalProps: Record<string, any>
    }>

let modals = $state<ModalSettings[]>([])

export function getModals() {
    return modals
}

export function openModal(props: ModalSettings) {
    const { modalProps, ...rest } = props
    const id = props.modalId || crypto.randomUUID()
    const modal: ModalSettings = {
        ...rest,
        modalProps,
        modalId: id,
        open: true,
        onOpenChange: () => closeModal(id)
    }
    modals.push(modal)
}

export function closeModal(id: string) {
    const idx = modals.findIndex((modal) => modal.modalId === id)
    if (idx !== -1) modals.splice(idx, 1)
}

export function closeAllModals() {
    modals.length = 0
}
