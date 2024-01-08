import { Skeleton } from '@sathene/ui-web'

export default function DashboardTasksLoadingPage() {
    return (
        <div className="flex flex-col gap-4 p-8 h-full">
            {Array.from<number>({ length: 6 })
                .fill(0)
                .map((_, i) => (
                    <Skeleton className="h-20 w-full" key={i++} />
                ))}
        </div>
    )
}
