'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@sathene/ui-web'

import type { DashboardLink } from '~/lib/consts'

interface Props {
    link: DashboardLink
}

export function DashboardSidebarLink({ link }: Props) {
    const pathname = usePathname()

    const Icon = link.icon

    return (
        <Link
            className={cn(
                'flex items-center gap-2 h-10 w-full rounded-xl px-3 text-sm font-bold',
                pathname.includes(link.href as string)
                    ? 'bg-primary text-background'
                    : 'hover:bg-primary/25'
            )}
            href={link.href ?? ''}
            key={link.title}
        >
            <Icon />

            {link.title}
        </Link>
    )
}
