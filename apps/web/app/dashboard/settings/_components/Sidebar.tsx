'use client'

import { DashboardSidebarLink } from './SidebarLink'
import { DASHBOARD_SETTINGS_LINKS } from '~/lib/consts'

export function DashboardSettingsSidebar() {
    return (
        <div className="flex flex-col items-center bg-accent p-4 border-r">
            <div className="flex flex-col justify-start gap-2 w-full">
                {DASHBOARD_SETTINGS_LINKS.map((link) => (
                    <DashboardSidebarLink link={link} key={link.title} />
                ))}
            </div>
        </div>
    )
}
