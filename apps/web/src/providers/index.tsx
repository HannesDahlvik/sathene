'use client'

import type { PropsWithChildren } from 'react'

import { ThemeProvider } from '@sathene/ui-web'

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
                <>{children}</>
            </TrpcProvider>
        </ThemeProvider>
    )
}
