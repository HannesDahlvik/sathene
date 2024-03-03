'use client'

import type { PropsWithChildren } from 'react'

import { AlertsProvider, ModalsProvider, ThemeProvider } from '@sathene/ui-web'

import { DateProvider } from './Date'
import TrpcProvider from './Trpc'

export function Providers({ children }: PropsWithChildren) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TrpcProvider>
                <ModalsProvider>
                    <AlertsProvider>
                        <DateProvider>
                            <>{children}</>
                        </DateProvider>
                    </AlertsProvider>
                </ModalsProvider>
            </TrpcProvider>
        </ThemeProvider>
    )
}
