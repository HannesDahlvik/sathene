import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    root: './src',
    server: {
        port: 5174
    },
    build: {
        outDir: '../dist',
        minify: false,
        emptyOutDir: true
    },
    plugins: [tailwindcss(), sveltekit()]
})
