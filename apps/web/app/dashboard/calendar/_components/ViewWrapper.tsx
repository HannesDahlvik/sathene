'use client'

import { useState } from 'react'

import {
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@sathene/ui-web'

import { DashboardCalendarMonthView } from './MonthView'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDate } from '~/hooks/useDate'

type CalencarView = 'day' | 'week' | 'month'

export function DashboardCalendarViewWrapper() {
    const { date, nextMonth, prevMonth, resetDate } = useDate()

    const [view, setView] = useState<CalencarView>('month')

    return (
        <>
            <div className="flex justify-between items-center w-full bg-accent p-3 border-b">
                <div className="grid grid-cols-[1fr_40px_175px_40px] items-center gap-4">
                    <Button className="mr-4" onClick={resetDate}>
                        Today
                    </Button>

                    <Button size="icon" variant="outline" onClick={prevMonth}>
                        <ChevronLeft />
                    </Button>

                    <div className="text-center">
                        <p className="text-xl font-bold">{date.format('MMMM YYYY')}</p>
                    </div>

                    <Button size="icon" variant="outline" onClick={nextMonth}>
                        <ChevronRight />
                    </Button>
                </div>

                <Select value={view} onValueChange={(val) => setView(val as CalencarView)}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder={view} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day" disabled>
                            Day
                        </SelectItem>
                        <SelectItem value="week" disabled>
                            Week
                        </SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1 h-max w-full p-6">
                {view === 'month' ? <DashboardCalendarMonthView /> : null}
            </div>
        </>
    )
}
