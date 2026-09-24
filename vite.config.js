import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // relative asset paths so the build works when hosted under any sub-path (e.g. a preview link)
  plugins: [react()],
})
