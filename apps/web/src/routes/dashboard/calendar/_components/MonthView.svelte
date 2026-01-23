<script lang="ts">
    import { type Dayjs, dayjs } from '@sathene/dayjs'
    import { cn } from '@sathene/ui'

    import { date as globalDate } from '$lib/stores/date.svelte'

    interface FormattedDate {
        date: Dayjs
        isThisMonth: boolean
        isToday: boolean
    }

    let month: FormattedDate[][] = $state([])

    $effect(() => {
        createMonth()
    })

    function createMonth() {
        let currentDate = globalDate.value.startOf('month').weekday(0)
        const nextMonth = globalDate.value.add(1, 'month').month()
        let allDates = []
        let weekDates = []
        let weekCounter = 1
        while (currentDate.weekday(0).month() !== nextMonth) {
            const formatted = formatDateObject(currentDate)
            weekDates.push(formatted)
            if (weekCounter === 7) {
                allDates.push(weekDates)
                weekDates = []
                weekCounter = 0
            }
            weekCounter++
            currentDate = currentDate.add(1, 'day')
        }

        month = allDates
    }

    function formatDateObject(date: Dayjs): FormattedDate {
        return {
            date,
            isThisMonth: date.month() === globalDate.value.month(),
            isToday: date.isToday()
        }
    }

    function checkDateIsSame(firstDate: Dayjs, secondDate: Dayjs): boolean {
        return (
            firstDate.date() === secondDate.date() &&
            firstDate.month() === secondDate.month() &&
            firstDate.year() === secondDate.year()
        )
    }
</script>

<div class="flex h-full flex-col">
    <div class="flex w-full items-center justify-center">
        {#each dayjs.weekdaysShort(true) as day, i}
            <p
                class={cn(
                    'flex h-8 w-full items-center justify-center border-r text-xs uppercase',
                    i === 6 && 'border-r-0'
                )}
            >
                {day}
            </p>
        {/each}
    </div>

    <div class="grid h-full flex-1 border-t border-b">
        {#each month as week, i}
            <div class="flex h-full">
                {#each week as day, j}
                    <div
                        class={cn(
                            'relative flex w-full flex-col gap-2 border-r border-b py-1 transition-none',
                            !day.isThisMonth && 'bg-accent opacity-50',
                            j === 6 && 'border-r-0',
                            i === month.length - 1 &&
                                'border-b-0 first:rounded-bl-xl last:rounded-br-xl'
                        )}
                    >
                        {#if day.isToday}
                            <div
                                class="bg-primary absolute top-0.5 right-0 left-0 mr-auto ml-auto h-7 w-7 rounded-full"
                            ></div>
                        {/if}

                        {#if checkDateIsSame(day.date, globalDate.value)}
                            <div
                                class="bg-primary absolute top-0.5 right-0 left-0 mr-auto ml-auto h-7 w-7 rounded-full"
                            ></div>
                        {/if}

                        <p
                            class={cn(
                                'z-10 flex h-6 w-full items-center justify-center text-sm',
                                checkDateIsSame(day.date, globalDate.value) &&
                                    'text-primary-foreground'
                            )}
                        >
                            {day.date.date()}
                        </p>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
