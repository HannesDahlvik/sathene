import { type Snippet, getContext } from 'svelte'

import { toast } from 'svelte-sonner'

import type { DashboardToolbarCtx, DashboardToolbarTitleCtx } from './types'

function errorHandler(error: Error) {
    console.error(error)

    toast.error(error.message, {
        duration: 5000
    })
}

function infoHandler(message: string) {
    toast.info(message, {
        duration: 5000
    })
}

function setToolbar(snippet: Snippet, title: string) {
    const { setToolbar } = getContext<DashboardToolbarCtx>('dashboard-toolbar')
    const { setToolbarTitle } = getContext<DashboardToolbarTitleCtx>('dashboard-toolbar-title')

    setToolbar(snippet)
    setToolbarTitle(title)
}

function clearToolbar() {
    const { clearToolbar } = getContext<DashboardToolbarCtx>('dashboard-toolbar')
    const { clearToolbarTitle } = getContext<DashboardToolbarTitleCtx>('dashboard-toolbar-title')

    clearToolbar()
    clearToolbarTitle()
}

export { errorHandler, infoHandler, setToolbar, clearToolbar }
