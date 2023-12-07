import { Calendar, Layout, type LucideIcon } from 'lucide-react'

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
    }
]
