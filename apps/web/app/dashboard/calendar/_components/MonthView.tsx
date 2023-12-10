'use client'

import { useEffect, useRef, useState } from 'react'

import { dayjs, type Dayjs } from '@sathene/dayjs'
import { cn } from '@sathene/ui-web'

import { useWindowSize } from '@uidotdev/usehooks'

interface FormattedDate {
    date: Dayjs
    isThisMonth: boolean
    isToday: boolean
}

export function DashboardCalendarMonthView() {
    const [globalDate] = useState(dayjs())
    const [month, setMonth] = useState<FormattedDate[][]>([])
    const { width: windowWidth } = useWindowSize()

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

    if (!windowWidth) return null

    return (
        <>
            <div className="flex justify-center items-center w-full bg-accent rounded-t-xl">
                {dayjs.weekdaysShort(true).map((day) => (
                    <p
                        className="flex justify-center items-center h-12 w-full uppercase text-sm"
                        key={day}
                    >
                        {day}
                    </p>
                ))}
            </div>

            <div className="grid h-[calc(100%-48px)] border rounded-b-xl">
                {month.map((week, i) => (
                    <div
                        className="grid h-full"
                        style={{
                            gridTemplateColumns: `repeat(7, ${(windowWidth - 725) / 7}px)`
                        }}
                        key={i}
                    >
                        {week.map((day, j) => (
                            <div
                                className={cn(
                                    'relative flex flex-col gap-2 w-full bg-accent py-1 border-r border-b',
                                    !day.isThisMonth && 'opacity-75 bg-muted',
                                    j === 6 && 'border-r-0',
                                    i === month.length - 1 &&
                                        'border-b-0 first:rounded-bl-xl last:rounded-br-xl'
                                )}
                                key={j}
                            >
                                {day.isToday && (
                                    <div className="absolute top-1 left-0 right-0 bg-primary rounded-full ml-auto mr-auto h-7 w-7"></div>
                                )}

                                <p
                                    className={cn(
                                        'flex justify-center items-center text-sm h-6 w-full z-10',
                                        day.isToday && 'text-primary-foreground'
                                    )}
                                >
                                    {day.date.date()}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}
