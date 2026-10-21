import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import { sketches } from './vite-sketches.ts'

// SKETCH_DIR points at the sketches to edit, normally inside the target project.
const sketchDir = path.resolve(process.env.SKETCH_DIR ?? 'sketches')

// Installed as a package, dependencies (fonts, CSS) sit outside this folder: allow the folder
// that holds node_modules.
const installRoot = import.meta.dirname.split(`${path.sep}node_modules${path.sep}`)[0]

export default defineConfig({
  plugins: [react(), tailwindcss(), sketches(sketchDir)],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  server: { fs: { allow: [searchForWorkspaceRoot(import.meta.dirname), installRoot] } },
})
