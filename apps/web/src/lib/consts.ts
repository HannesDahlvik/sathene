import type { SortOrderEnum } from '@sathene/db'

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

export const DASHBOARD_TASKLIST_SORT_ORDERS: { label: string; value: SortOrderEnum }[] = [
    { label: 'Date', value: 'DATE' },
    { label: 'Due Date', value: 'DUEDATE' },
    { label: 'Title', value: 'TITLE' }
]
