import { type Dayjs, dayjs } from '@sathene/dayjs'

export const date = $state({
    value: dayjs(),
    nextYear: () => {
        date.value = date.value.add(1, 'year')
    },
    prevYear: () => {
        date.value = date.value.subtract(1, 'year')
    },
    nextMonth: () => {
        date.value = date.value.add(1, 'month')
    },
    prevMonth: () => {
        date.value = date.value.subtract(1, 'month')
    },
    nextWeek: () => {
        date.value = date.value.add(1, 'week')
    },
    prevWeek: () => {
        date.value = date.value.subtract(1, 'week')
    },
    reset: () => {
        date.value = dayjs()
    },
    setDate: (newDate: Dayjs) => {
        date.value = newDate
    },
    getDate: () => {
        return date.value
    }
})
