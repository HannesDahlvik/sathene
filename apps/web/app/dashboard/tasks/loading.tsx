import { Skeleton } from '@sathene/ui-web'

export default function DashboardTasksLoadingPage() {
    return (
        <div className="flex flex-col gap-4">
            {Array.from<number>({ length: 8 })
                .fill(0)
                .map((_, i) => (
                    <Skeleton className="h-20 w-full" key={i++} />
                ))}
        </div>
    )
}
