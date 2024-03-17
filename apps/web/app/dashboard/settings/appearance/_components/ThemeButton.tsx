'use client'

import { cn, useTheme } from '@sathene/ui-web'

interface Props {
    label: string
    value: 'light' | 'dark'
}

export function DashboardSettingsAppearanceThemeButton({ label, value }: Props) {
    const { setTheme, theme } = useTheme()

    return (
        <button
            className={cn(
                'h-40 w-full p-3 border-2 rounded-lg cursor-pointer',
                theme === value && 'border-primary'
            )}
            onClick={() => setTheme(value)}
        >
            <div
                className={cn(
                    'flex justify-center items-center h-full w-full rounded-lg cursor-pointer',
                    value === 'light' ? 'bg-white text-black' : 'bg-[#242424] text-white'
                )}
            >
                {label}
            </div>
        </button>
    )
}
