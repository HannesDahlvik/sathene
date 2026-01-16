import { Calendar, ListTodo, Notebook, Palette, PanelsTopLeft, UserRound } from '@lucide/svelte'

export interface DashboardLink {
    title: string
    icon: any
    href?: `/dashboard/${string}`
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
        icon: ListTodo
    },
    {
        title: 'Notes',
        href: '/dashboard/notes',
        icon: Notebook
    }
]
