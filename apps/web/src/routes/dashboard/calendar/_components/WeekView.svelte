<script lang="ts">
    import { onMount } from 'svelte'

    import { type Dayjs, dayjs } from '@sathene/dayjs'
    import { cn } from '@sathene/ui'

    import { date } from '$lib/stores/date.svelte'

    interface WeekDay {
        date: Dayjs
        day: string
        isToday: boolean
    }

    let weekDays: WeekDay[] = $state([])
    let week: Dayjs[] = $state([])
    let needlePosition = $state(0)
    let hasRun = $state(false)

    const hourBoxHeight = 100

    onMount(() => {
        calcNeedlePosition()
        const interval = setInterval(() => calcNeedlePosition(), 1000)
        return () => clearInterval(interval)
    })

    $effect(() => {
        createWeekDays()
        createWeek()
    })

    $effect(() => {
        const wrapper = document.querySelector('.dashboard-content') as HTMLElement

        if (!hasRun && needlePosition !== 0) {
            hasRun = true
            if (wrapper) {
                wrapper.scrollTo({
                    top: needlePosition - 200,
                    behavior: 'smooth'
                })
            }
        }
    })

    function createWeekDays() {
        weekDays = dayjs.weekdaysShort(true).map((day, i) => {
            const test = date.value.startOf('week').add(i, 'day')
            return {
                date: test,
                day,
                isToday: test.isToday()
            }
        })
    }

    function createWeek() {
        let currentWeek = date.value.startOf('week')
        let nextWeek = currentWeek.add(1, 'week').week()
        let allDates: Dayjs[] = []
        while (currentWeek.week() !== nextWeek) {
            allDates.push(currentWeek)
            currentWeek = currentWeek.add(1, 'day')
        }
        week = allDates
    }

    function calcNeedlePosition() {
        const time = dayjs()
        const hour = time.hour()
        const minute = time.minute()

        const hourPosition = hour * hourBoxHeight
        const minutePosition = hourBoxHeight / (60 / minute)
        const finalPosition = hourPosition + minutePosition

        needlePosition = finalPosition + 66
    }
</script>

<div class="relative flex flex-col">
    <div class="absolute right-0 h-px w-[calc(100%-97px)]" style={`top: ${needlePosition}px`}>
        <div class="bg-primary absolute right-0 h-px w-[calc(100%-10px)]"></div>
        <div class="bg-primary absolute -top-0.5 h-1.5 w-1.5 rounded-full"></div>
    </div>

    <div
        class="bg-background sticky top-0 z-40 grid h-full w-full grid-cols-[100px_repeat(7,1fr)] items-center justify-center"
    >
        <div aria-hidden="true"></div>

        {#each weekDays as day, i}
            <div
                class={cn(
                    'relative flex h-full w-full flex-col items-center justify-center py-2',
                    i === 6 && 'border-r-0'
                )}
            >
                <p class={cn('text-xs uppercase', day.isToday && 'text-primary')}>
                    {day.day}
                </p>

                <div
                    class={day.isToday
                        ? 'before:bg-primary relative z-10 flex items-center justify-center before:absolute before:-inset-1 before:-top-0.5 before:z-0 before:h-6 before:w-6 before:rounded-full before:opacity-75'
                        : ''}
                >
                    <p class={cn('relative font-semibold')}>
                        {day.date.date()}
                    </p>
                </div>
            </div>
        {/each}
    </div>

    <div
        class="relative grid h-full flex-1 grid-cols-[100px_repeat(7,1fr)] overflow-y-scroll border-b"
    >
        <div class="grid grid-rows-[repeat(24,100px)] border-r">
            {#each Array(24) as _, i}
                <div
                    class="bg-border absolute right-0 h-px w-[calc(100%-90px)]"
                    style={`top: ${i * 100 + 10}px`}
                ></div>

                <div class="text-center">
                    <p class="text-muted-foreground">{i}:00</p>
                </div>
            {/each}
        </div>

        {#each week as day, i}
            <div
                class={cn(
                    'relative flex w-full flex-col gap-2 border-r py-1 transition-none',
                    i === 6 && 'border-r-0 first:rounded-bl-xl last:rounded-br-xl'
                )}
            ></div>
        {/each}
    </div>
</div>
