import type { PropsWithChildren } from 'react'

import { redirect } from 'next/navigation'

import { getServerSession } from '@sathene/api'

export default async function DashboardLayout({ children }: PropsWithChildren) {
    const session = await getServerSession()

    if (!session) return redirect('/login')

    return (
        <div>
            <div>{children}</div>
        </div>
    )
}
