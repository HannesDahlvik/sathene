import { DashboardTimeline } from '../_components/Timeline'

export default function DashboardOverviewPage() {
    return (
        <div className="grid grid-cols-[1fr_375px] h-full">
            <div className="w-full p-6">
                <h2>Dashboard Overview Page</h2>
            </div>

            <DashboardTimeline />
        </div>
    )
}
