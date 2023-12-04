'use client'

import { Button } from '@sathene/ui-web'

import { useAuth } from '~/providers/Auth'

export default function DashboardPage() {
    const { logout } = useAuth()

    return (
        <div>
            <h2>DashboardPage</h2>

            <Button onClick={logout}>Logout</Button>
        </div>
    )
}
