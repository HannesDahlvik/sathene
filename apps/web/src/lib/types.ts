import type { Snippet } from 'svelte'

interface DashboardToolbarCtx {
    setToolbar: (snippets: Snippet) => void
    clearToolbar: () => void
}

interface DashboardToolbarTitleCtx {
    setToolbarTitle: (title: string) => void
    clearToolbarTitle: () => void
}

export type { DashboardToolbarCtx, DashboardToolbarTitleCtx }
