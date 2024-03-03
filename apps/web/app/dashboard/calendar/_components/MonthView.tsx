'use client'

import { useEffect, useState } from 'react'

import { dayjs, type Dayjs } from '@sathene/dayjs'
import { cn } from '@sathene/ui-web'

import { useDate } from '~/hooks/useDate'

interface FormattedDate {
    date: Dayjs
    isThisMonth: boolean
    isToday: boolean
}

interface Props {
    onDayClick?: (day: FormattedDate) => void
}

export function DashboardCalendarMonthView({ onDayClick }: Props) {
    const { date: globalDate } = useDate()
    const [month, setMonth] = useState<FormattedDate[][]>([])

    useEffect(() => {
        createMonth()
    }, [globalDate])

    const createMonth = () => {
        let currentDate = globalDate.startOf('month').weekday(0)
        const nextMonth = globalDate.add(1, 'month').month()
        let allDates = []
        let weekDates = []
        let weekCounter = 1
        while (currentDate.weekday(0).month() !== nextMonth) {
            const formated = formatDateObject(currentDate)
            weekDates.push(formated)
            if (weekCounter === 7) {
                allDates.push(weekDates)
                weekDates = []
                weekCounter = 0
            }
            weekCounter++
            currentDate = currentDate.add(1, 'day')
        }

        setMonth(allDates)
    }

    const formatDateObject = (date: Dayjs): FormattedDate => {
        const formatedObj: FormattedDate = {
            date,
            isThisMonth: globalDate.month() === date.month(),
            isToday: date.isToday()
        }
        return formatedObj
    }

    const checkDateIsSame = (firstDate: Dayjs, secondDate: Dayjs): boolean => {
        if (
            firstDate.date() === secondDate.date() &&
            firstDate.month() === secondDate.month() &&
            firstDate.year() === secondDate.year()
        ) {
            return true
        } else return false
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-center items-center w-full bg-accent rounded-t-xl">
                {dayjs.weekdaysMin(true).map((day) => (
                    <p
                        className="flex justify-center items-center h-8 w-full uppercase text-xs"
                        key={day}
                    >
                        {day}
                    </p>
                ))}
            </div>

            <div className="grid flex-1 h-full border rounded-b-xl">
                {month.map((week, i) => (
                    <div className="flex h-full" key={i}>
                        {week.map((day, j) => (
                            <div
                                className={cn(
                                    'relative flex flex-col gap-2 w-full bg-accent py-1 border-r border-b',
                                    !day.isThisMonth && 'opacity-75 bg-muted',
                                    j === 6 && 'border-r-0',
                                    i === month.length - 1 &&
                                        'border-b-0 first:rounded-bl-xl last:rounded-br-xl',
                                    onDayClick && 'cursor-pointer hover:bg-primary/25'
                                )}
                                key={j}
                                onClick={() => (onDayClick ? onDayClick(day) : null)}
                            >
                                {day.isToday && (
                                    <div className="absolute top-0.5 left-0 right-0 bg-purple-500 rounded-full ml-auto mr-auto h-7 w-7"></div>
                                )}

                                {checkDateIsSame(day.date, globalDate) && (
                                    <div className="absolute top-0.5 left-0 right-0 bg-primary rounded-full ml-auto mr-auto h-7 w-7"></div>
                                )}

                                <p
                                    className={cn(
                                        'flex justify-center items-center text-sm h-6 w-full z-10',
                                        checkDateIsSame(day.date, globalDate) &&
                                            'text-primary-foreground'
                                    )}
                                >
                                    {day.date.date()}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
