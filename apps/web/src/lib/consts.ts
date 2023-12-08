import { Calendar, CheckCircle, Layout, StickyNote, type LucideIcon } from 'lucide-react'

interface DashboardLink {
    title: string
    href: `/dashboard/${string}`
    icon: LucideIcon
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
