import { type AlertDialogRootProps } from '@sathene/ui'

export type AlertSettings = Partial<AlertDialogRootProps> &
    Partial<{
        title: string
        description: string
        alertId: string
        loading: boolean
        onConfirm: () => void
        onCancel: () => void
        labels: Partial<{
            cancel: string
            action: string
        }>
    }>

let alerts = $state<AlertSettings[]>([])

export function getAlerts() {
    return alerts
}

export function openAlert(props: AlertSettings) {
    const id = props.alertId || crypto.randomUUID()
    const modal: AlertSettings = {
        ...props,
        alertId: id,
        open: true,
        onOpenChange: () => closeAlert(id)
    }
    alerts.push(modal)
}

export function closeAlert(id: string) {
    const idx = alerts.findIndex((alert) => alert.alertId === id)
    if (idx !== -1) alerts.splice(idx, 1)
}

export function closeAllAlerts() {
    alerts.length = 0
}
