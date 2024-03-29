'use client'

import { useEffect, useRef, useState } from 'react'

import { dayjs } from '@sathene/dayjs'
import { cn } from '@sathene/ui-web'

export function DashboardTimeline() {
    const hours = Array.from<number>({ length: 24 }).fill(0)
    const hourBoxHeight = 125

    const wrapper = useRef<HTMLDivElement>(null)
    const hasRun = useRef(false)

    const [needlePosition, setNeedlePosition] = useState(0)

    useEffect(() => {
        calcNeedlePos()
        const interval = setInterval(() => calcNeedlePos(), 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!hasRun.current && needlePosition !== 0) {
            hasRun.current = true
            if (wrapper.current) {
                wrapper.current.scrollTo({
                    top: needlePosition - 200,
                    behavior: 'smooth'
                })
            }
        }
    }, [needlePosition])

    const calcNeedlePos = () => {
        const time = dayjs()
        const hour = time.hour()
        const minute = time.minute()

        const hourPos = hour * hourBoxHeight
        const minutePos = hourBoxHeight / (60 / minute)
        const finalPos = hourPos + minutePos

        setNeedlePosition(finalPos)
    }

    return (
        <div
            className="relative grid grid-rows-[repeat(24,_125px)] h-full w-full rounded-lg overflow-y-scroll"
            ref={wrapper}
        >
            {hours.map((_, i) => (
                <div className="grid grid-cols-[75px_1fr]" key={i}>
                    <div
                        className={cn(
                            'h-full w-full p-2 border-r border-b text-center',
                            i === hours.length - 1 && 'border-b-0'
                        )}
                    >
                        <p>{i}:00</p>
                    </div>
                    <div
                        className={cn(
                            'h-full w-full p-2 border-b',
                            i === hours.length - 1 && 'border-b-0'
                        )}
                    />
                </div>
            ))}

            <div className="absolute h-[1px] w-full bg-red-500" style={{ top: needlePosition }} />
        </div>
    )
}
