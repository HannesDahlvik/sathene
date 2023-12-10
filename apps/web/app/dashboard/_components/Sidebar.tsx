'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button, cn, useTheme } from '@sathene/ui-web'

import { version } from '../../../package.json'
import { LogOut, Moon, Sun } from 'lucide-react'
import { DASHBOARD_LINKS } from '~/lib/consts'
import { useAuth } from '~/providers/Auth'

export function DashboardSidebar() {
    const { logout } = useAuth()
    const { setTheme, theme } = useTheme()
    const pathname = usePathname()

    return (
        <div className="flex flex-col items-center p-6 pr-0">
            <div className="flex items-center gap-2 w-full">
                <Link className="inline-flex items-center gap-2 text-2xl font-bold" href="/">
                    Sathene
                </Link>

                <p className="p-0.5 px-1 border rounded bg-muted text-xs">v{version}</p>
            </div>

            <div className="flex flex-col justify-start gap-2 w-full mt-12">
                {DASHBOARD_LINKS.map((link) => {
                    const Icon = link.icon

                    return (
                        <Link
                            className={cn(
                                'flex items-center gap-2 h-12 w-full rounded-xl px-4 font-bold',
                                pathname === link.href
                                    ? 'bg-primary text-background'
                                    : 'hover:bg-primary/25'
                            )}
                            href={link.href}
                            key={link.title}
                        >
                            <Icon />

                            {link.title}
                        </Link>
                    )
                })}
            </div>

            <div className="flex justify-center gap-2 w-full mt-auto">
                <Button size="icon" onClick={logout}>
                    <LogOut size={20} />
                </Button>

                <Button size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
            </div>
        </div>
    )
}
