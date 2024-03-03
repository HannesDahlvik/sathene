'use client'

import { type PropsWithChildren, useState, createContext } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '../components/alert-dialog'
import { genRandomString } from '../lib/utils'
import type { AlertDialogProps } from '@radix-ui/react-alert-dialog'

export type AlertSettings = Partial<AlertDialogProps> &
    Partial<{
        title: string
        description: string
        alertId: string
        loading: boolean
        onSuccess: () => void
        onCancel: () => void
        labels: Partial<{
            cancel: string
            action: string
        }>
    }>

export type AlertsContextProps = {
    openAlert: (props: AlertSettings) => void
    closeAlert: (id: string) => void
    closeAll: () => void
} | null

export const AlertDialogsContext = createContext<AlertsContextProps>(null)

export function AlertsProvider({ children }: PropsWithChildren) {
    const [alerts, setAlerts] = useState<AlertSettings[]>([])

    const openAlert = (props: AlertSettings) => {
        const id = props.alertId || genRandomString(20)
        const alertDialog: AlertSettings = {
            ...props,
            alertId: id,
            open: true,
            onOpenChange: () => closeAlert(id)
        }

        setAlerts([...alerts, alertDialog])
    }

    const closeAlert = (id: string) => {
        const arr = [...alerts]
        let closedModal = alerts.findIndex((m) => m.alertId === id)
        arr.splice(closedModal, 1)
        setAlerts(arr)
    }

    const closeAll = () => {
        setAlerts([])
    }

    return (
        <AlertDialogsContext.Provider value={{ closeAll, closeAlert, openAlert }}>
            {alerts.map((alert) => (
                <AlertDialog
                    open={alert.open}
                    onOpenChange={alert.onOpenChange}
                    key={alert.alertId}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{alert.title}</AlertDialogTitle>
                            {alert.description && (
                                <AlertDialogDescription>{alert.description}</AlertDialogDescription>
                            )}
                        </AlertDialogHeader>

                        {alert.children}

                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={alert.onCancel}>
                                {alert.labels?.cancel ?? 'Cancel'}
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={alert.onSuccess}>
                                {alert.labels?.action ?? 'Continue'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ))}

            {children}
        </AlertDialogsContext.Provider>
    )
}
