import { useContext } from 'react'

import { type AlertSettings, AlertDialogsContext } from '../providers/alerts'

type AlertDialogsEvents = {
    openAlert(payload: AlertSettings): void
    closeAlert(id: string): void
    closeAllAlerts(): void
}

export const useAlerts = (): AlertDialogsEvents => {
    const ctx = useContext(AlertDialogsContext)

    const openAlert = (payload: AlertSettings) => {
        ctx?.openAlert(payload)
    }

    const closeAlert = (id: string) => {
        ctx?.closeAlert(id)
    }

    const closeAllAlerts = () => {
        ctx?.closeAll()
    }

    return {
        openAlert,
        closeAlert,
        closeAllAlerts
    }
}
