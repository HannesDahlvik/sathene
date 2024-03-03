import { DashboardOverviewDateChanger } from './_components/DateChanger'

export default async function DashboardOverviewPage() {
    return (
        <div className="flex flex-col gap-4 h-full p-8">
            <div className="flex items-center gap-4">
                <h2>Overview</h2>

                <DashboardOverviewDateChanger />
            </div>
        </div>
    )
}
