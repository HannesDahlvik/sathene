'use client'

import Link from 'next/link'

import { Button } from '@sathene/ui-web'

import packageJson from '../../../package.json'
import { DashboardSidebarLink } from './SidebarLink'
import { LogOut, Moon, Settings, Sun } from 'lucide-react'
import { useAuth } from '~/hooks/useAuth'
import { DASHBOARD_LINKS } from '~/lib/consts'

export function DashboardSidebar() {
    const { logout } = useAuth()

    return (
        <div className="flex flex-col items-center bg-accent p-4 border-r">
            <div className="flex justify-between items-center gap-2 w-full">
                <div className="flex items-center gap-2">
                    <Link className="inline-flex items-center gap-2 text-2xl font-bold" href="/">
                        Sathene
                    </Link>

                    <p className="p-0.5 px-1 border rounded bg-muted text-xs">
                        v{packageJson.version}
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-start gap-2 w-full mt-12">
                {DASHBOARD_LINKS.map((link) => (
                    <DashboardSidebarLink link={link} key={link.title} />
                ))}
            </div>

            <div className="flex flex-col justify-center gap-2 w-full mt-auto">
                <DashboardSidebarLink
                    link={{ title: 'Settings', icon: Settings, href: '/dashboard/settings' }}
                />

                <DashboardSidebarLink link={{ title: 'Logout', icon: LogOut }} onClick={logout} />
            </div>
        </div>
    )
}
