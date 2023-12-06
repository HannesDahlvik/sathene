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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession()

    return (
        <html lang="en" className={lato.variable}>
            <body>
                <AuthProvider session={session}>
                    <Providers>
                        <Toaster />

                        <>{children}</>
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    )
}
