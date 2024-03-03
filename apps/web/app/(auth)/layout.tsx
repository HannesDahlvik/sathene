import type { PropsWithChildren } from 'react'

import { redirect } from 'next/navigation'

import { getServerSession } from '@sathene/api'

export default async function AuthLayout({ children }: PropsWithChildren) {
    const { session } = await getServerSession()

    if (session) return redirect('/dashboard')

    return (
        <div className="flex flex-col items-center pt-40 h-screen">
            <h2 className="mb-8 text-6xl">Sathene</h2>

            <div className="flex flex-col justify-center items-center w-[400px] bg-secondary p-12 rounded-lg border shadow-xl">
                {children}
            </div>
        </div>
    )
}
