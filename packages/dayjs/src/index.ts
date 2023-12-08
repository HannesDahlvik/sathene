import dayjs from 'dayjs'
import en from 'dayjs/locale/en'
import isTodayPlugin from 'dayjs/plugin/isToday'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekdayPlugin from 'dayjs/plugin/weekday'

dayjs.locale({
    ...en,
    weekStart: 1
})
dayjs.extend(isTodayPlugin)
dayjs.extend(localeData)
dayjs.extend(relativeTime)
dayjs.extend(weekOfYear)
dayjs.extend(weekdayPlugin)

export type Dayjs = dayjs.Dayjs

export { dayjs }
