import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "../../src/main/resources/static/app"
    },
    base: '/app',
    test: {
        environment: 'jsdom',
        css: true
    }
})
