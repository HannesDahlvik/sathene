'use client'

import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@sathene/ui-web'

import type { DashboardLink } from '~/lib/consts'

interface Props {
    link: DashboardLink
    onClick?: () => void
}

export function DashboardSidebarLink({ link, onClick }: Props) {
    const pathname = usePathname()
    const router = useRouter()

    const Icon = link.icon

    const handleClick = () => {
        if (onClick) {
            onClick()
        } else if (link.href) {
            router.push(link.href)
        }
    }

    return (
        <button
            className={cn(
                'flex items-center gap-2 h-12 w-full rounded-xl px-4 font-bold',
                pathname.includes(link.href) ? 'bg-primary text-background' : 'hover:bg-primary/25'
            )}
            onClick={handleClick}
            key={link.title}
        >
            <Icon />

            {link.title}
        </button>
    )
}
