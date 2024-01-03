import { useContext } from 'react'

import { DateContext, type DateContextType } from '~/providers/Date'

export function useDate() {
    const dateCtx = useContext(DateContext) as DateContextType
    return { ...dateCtx }
}
