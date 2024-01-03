'use client'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@sathene/ui-web'

import { DashboardCalendarMonthView } from '../../calendar/_components/MonthView'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
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
                    <div className="flex justify-around items-center w-full mb-4">
                        <div className="flex items-center">
                            <button onClick={prevMonth}>
                                <ChevronsLeft />
                            </button>

                            <button onClick={() => setDate(date.subtract(1, 'day'))}>
                                <ChevronLeft />
                            </button>
                        </div>

                        <Button size="xs" onClick={resetDate}>
                            Reset
                        </Button>

                        <div className="flex items-center">
                            <button onClick={() => setDate(date.add(1, 'day'))}>
                                <ChevronRight />
                            </button>

                            <button onClick={nextMonth}>
                                <ChevronsRight />
                            </button>
                        </div>
                    </div>

                    <DashboardCalendarMonthView onDayClick={(newDate) => setDate(newDate.date)} />
                </PopoverContent>
            </Popover>
        </div>
    )
}
