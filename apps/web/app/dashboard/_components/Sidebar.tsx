'use client'

import Link from 'next/link'

import { Button, useTheme } from '@sathene/ui-web'

import { DashboardSidebarLink } from './SidebarLink'
import { LogOut, Moon, Sun } from 'lucide-react'
import { useAuth } from '~/hooks/useAuth'
import { DASHBOARD_LINKS } from '~/lib/consts'

export function DashboardSidebar() {
    const { logout } = useAuth()
    const { setTheme, theme } = useTheme()

    return (
        <div className="flex flex-col items-center bg-accent p-4 border-r">
            <div className="flex justify-between items-center gap-2 w-full">
                <div className="flex items-center gap-2">
                    <Link className="inline-flex items-center gap-2 text-2xl font-bold" href="/">
                        Sathene
                    </Link>
                </div>

                <Button
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
            </div>

            <div className="flex flex-col justify-start gap-2 w-full mt-12">
                {DASHBOARD_LINKS.map((link) => (
                    <DashboardSidebarLink link={link} key={link.title} />
                ))}
            </div>

            <div className="flex flex-col justify-center gap-2 w-full mt-auto">
                <DashboardSidebarLink link={{ title: 'Logout', icon: LogOut }} onClick={logout} />
            </div>
        </div>
    )
}
