export type Themes = 'light' | 'dark'

let theme: Themes = $state('dark')

function checkTheme() {
    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark')
        theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark')
        theme = 'light'
    }
}

function toggleTheme() {
    if (localStorage.theme === 'dark') {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        theme = 'light'
    } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        theme = 'dark'
    }
}

function getTheme() {
    return theme
}

export { checkTheme, getTheme, toggleTheme }
