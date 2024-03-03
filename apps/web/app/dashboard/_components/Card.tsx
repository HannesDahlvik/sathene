import type { PropsWithChildren } from 'react'

import { cn } from '@sathene/ui-web'

interface Props extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {}

export function DashboardCard({ children, className }: Props) {
    return <div className={cn('bg-accent p-4 border rounded-lg', className)}>{children}</div>
}
