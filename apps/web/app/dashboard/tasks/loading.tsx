import { Skeleton } from '@sathene/ui-web'

export default function DashboardTasksLoadingPage() {
    return (
        <div className="grid grid-cols-[1fr_400px] h-full">
            <div className="flex flex-col gap-4 p-8">
                <Skeleton className="h-12 w-60" />

                <Skeleton className="h-full w-full" />
            </div>

            <Skeleton className="h-full w-full rounded-r-xl" />
        </div>
    )
}
