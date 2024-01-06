'use client'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@sathene/ui-web'

import { DashboardCalendarMonthView } from '../../calendar/_components/MonthView'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDate } from '~/hooks/useDate'

export function DashboardOverviewDateChanger() {
    const { date, nextMonth, prevMonth, resetDate, setDate } = useDate()

    return (
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">{date.format('DD/MM/YYYY')}</Button>
                </PopoverTrigger>

                <PopoverContent>
                    <div className="flex justify-center items-center gap-4 w-full mb-4">
                        <div className="flex items-center">
                            <button onClick={prevMonth}>
                                <ChevronLeft />
                            </button>
                        </div>

                        <Button size="xs" onClick={resetDate}>
                            Today
                        </Button>

                        <div className="flex items-center">
                            <button onClick={nextMonth}>
                                <ChevronRight />
                            </button>
                        </div>
                    </div>

                    <DashboardCalendarMonthView onDayClick={(newDate) => setDate(newDate.date)} />
                </PopoverContent>
            </Popover>
        </div>
    )
}
