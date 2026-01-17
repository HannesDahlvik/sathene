import {
    Calendar,
    ClipboardList,
    type Icon as IconType,
    Notebook,
    PanelsTopLeft
} from '@lucide/svelte'

export interface DashboardLink {
    title: string
    icon: typeof IconType
    href: `/dashboard/${string}`
}

export const DASHBOARD_LINKS: DashboardLink[] = [
    {
        title: 'Overview',
        href: '/dashboard/overview',
        icon: PanelsTopLeft
    },
    {
        title: 'Calendar',
        href: '/dashboard/calendar',
        icon: Calendar
    },
    {
        title: 'Tasks',
        href: '/dashboard/tasks',
        icon: ClipboardList
    },
    {
        title: 'Notes',
        href: '/dashboard/notes',
        icon: Notebook
    }
]
