import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { sketches } from './vite-sketches.ts'

// SKETCH_DIR points at the sketches to edit, normally inside the target project.
const sketchDir = path.resolve(process.env.SKETCH_DIR ?? 'sketches')

export default defineConfig({
  plugins: [react(), tailwindcss(), sketches(sketchDir)],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
})
