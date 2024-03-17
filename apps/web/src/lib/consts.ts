import {
    Calendar,
    CheckCircle,
    Layout,
    Notebook,
    type LucideIcon,
    User2,
    Palette
} from 'lucide-react'

export interface DashboardLink {
    title: string
    icon: LucideIcon
    href?: `/dashboard/${string}`
}

export const DASHBOARD_LINKS: DashboardLink[] = [
    {
        title: 'Overview',
        href: '/dashboard/overview',
        icon: Layout
    },
    {
        title: 'Calendar',
        href: '/dashboard/calendar',
        icon: Calendar
    },
    {
        title: 'Tasks',
        href: '/dashboard/tasks',
        icon: CheckCircle
    },
    {
        title: 'Notes',
        href: '/dashboard/notes',
        icon: Notebook
    }
]

export const DASHBOARD_SETTINGS_LINKS: DashboardLink[] = [
    {
        title: 'Profile',
        icon: User2,
        href: '/dashboard/settings/profile'
    },
    {
        title: 'Appearance',
        icon: Palette,
        href: '/dashboard/settings/appearance'
    }
]
