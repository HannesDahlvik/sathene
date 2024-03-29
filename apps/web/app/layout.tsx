import type { PropsWithChildren } from 'react'

import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

import { getServerSession } from '@sathene/api'
import { Toaster } from '@sathene/ui-web'

import './globals.css'
import { Providers } from '~/providers'
import AuthProvider from '~/providers/Auth'

const lato = Lato({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'],
    variable: '--font'
})

export const metadata: Metadata = {
    title: {
        default: 'Sathene',
        template: '%s | Sathene'
    }
}

export default async function RootLayout({ children }: PropsWithChildren) {
    const { user } = await getServerSession()

    return (
        <html lang="en" className={lato.variable} suppressHydrationWarning>
            <body>
                <AuthProvider user={user}>
                    <Providers>
                        <Toaster position="bottom-center" />

                        <>{children}</>
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    )
}
