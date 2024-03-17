import type { PropsWithChildren } from 'react'

import { DashboardSettingsSidebar } from './_components/Sidebar'

export default function DashboardSettingsLayout({ children }: PropsWithChildren) {
    return (
        <div className="grid grid-cols-[225px_1fr] h-full">
            <DashboardSettingsSidebar />

            <div className="flex justify-center p-8">
                <div className="w-[400px]">{children}</div>
            </div>
        </div>
    )
}
