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
    const wrapperRef = useRef<HTMLDivElement>(null)
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

        calcCalendarWeekHeight(allDates.length)
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

    const calcCalendarWeekHeight = (numOfWeeks: number) => {
        if (wrapperRef.current) {
            wrapperRef.current.style.gridTemplateRows = `repeat(${numOfWeeks}, calc(100% / ${numOfWeeks}))`
        }
    }

    if (!windowWidth) return null

    return (
        <>
            <div className="flex justify-center items-center">
                {dayjs.weekdays(true).map((day) => (
                    <p className="flex justify-center items-center h-10 w-full border-x" key={day}>
                        {day}
                    </p>
                ))}
            </div>

            <div className="grid h-[calc(100%-40px)] w-full" ref={wrapperRef}>
                {month.map((week, i) => (
                    <div
                        className={cn('grid h-full')}
                        style={{
                            gridTemplateColumns: `repeat(7, ${(windowWidth - 325) / 7}px)`
                        }}
                        key={i}
                    >
                        {week.map((day, j) => (
                            <div
                                className={cn(
                                    'relative flex flex-col gap-2 w-full py-1 border',
                                    !day.isThisMonth && 'opacity-75 bg-muted'
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
