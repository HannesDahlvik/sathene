import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

import './globals.css'
import { Providers } from '~/providers'

const lato = Lato({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    variable: '--font'
})

export const metadata: Metadata = {
    title: 'Sathene'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={lato.variable}>
                <Providers>
                    <>{children}</>
                </Providers>
            </body>
        </html>
    )
}
