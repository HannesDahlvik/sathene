import { Calendar, CheckCircle, Layout, StickyNote, type LucideIcon } from 'lucide-react'

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
        icon: StickyNote
    }
]
