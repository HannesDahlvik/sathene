'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@sathene/ui-web'

import { DASHBOARD_LINKS } from '~/lib/consts'

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col items-center p-6 pr-0">
            <div className=" w-full">
                <Link className="inline-flex items-center gap-2 text-2xl font-bold" href="/">
                    Sathene
                </Link>
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
                        >
                            <Icon />

                            {link.title}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
