'use client'

import { Label } from '@sathene/ui-web'

import { DashboardSettingsAppearanceThemeButton } from './_components/ThemeButton'

export default function DashboardSettingsAppearancePage() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
                <Label>Theme</Label>
                <Label className="text-muted-foreground">Select the theme for the dashboard</Label>
            </div>

            <div className="flex gap-4">
                <DashboardSettingsAppearanceThemeButton label="Light" value="light" />
                <DashboardSettingsAppearanceThemeButton label="Dark" value="dark" />
            </div>
        </div>
    )
}
