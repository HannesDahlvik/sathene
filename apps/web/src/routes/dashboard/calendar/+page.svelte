<script lang="ts">
    import { onMount } from 'svelte'

    import { Button, Select } from '@sathene/ui'

    import { date } from '$lib/stores/date.svelte'
    import { clearToolbar, setToolbar } from '$lib/utils'
    import { ChevronLeft, ChevronRight } from '@lucide/svelte'

    import DayView from './_components/DayView.svelte'
    import MonthView from './_components/MonthView.svelte'
    import WeekView from './_components/WeekView.svelte'

    const calendarViews = ['month', 'week', 'day'] as const
    type CalendarView = 'month' | 'week' | 'day'

    let view: CalendarView = $state('month')
    let triggerContent = $derived(calendarViews.find((v) => v === view) ?? 'month')

    onMount(() => {
        setToolbar(toolbar, '')

        return () => {
            clearToolbar()
        }
    })
</script>

{#snippet toolbar()}
    <div class="flex w-full items-center justify-between">
        <div class="grid grid-cols-[1fr_40px_175px_40px] items-center gap-4">
            <Button variant="secondary" onclick={date.reset}>Today</Button>

            <Button variant="outline" size="sm" onclick={date.prevMonth}>
                <ChevronLeft />
            </Button>

            <div class="flex items-center justify-center text-center">
                <p class="text-lg font-bold">{date.value.format('MMMM YYYY')}</p>
            </div>

            <Button variant="outline" size="sm" onclick={date.nextMonth}>
                <ChevronRight />
            </Button>
        </div>

        <Select.Root type="single" name="calendar-view" bind:value={view}>
            <Select.Trigger class="w-35 capitalize">
                {triggerContent}
            </Select.Trigger>
            <Select.Content>
                <Select.Item value="month">Month</Select.Item>
                <Select.Item value="week">Week</Select.Item>
                <Select.Item value="day">Day</Select.Item>
            </Select.Content>
        </Select.Root>
    </div>
{/snippet}

{#if view === 'month'}
    <MonthView />
{:else if view === 'week'}
    <WeekView />
{:else if view === 'day'}
    <DayView />
{/if}
