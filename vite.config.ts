import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import pkg from './package.json' with { type: 'json' }
import { sketches } from './vite-sketches.ts'

// SKETCH_DIR points at the sketches to edit, normally inside the target project.
const sketchDir = path.resolve(process.env.SKETCH_DIR ?? 'sketches')

// Installed as a package (pnpm dlx, global store), dependencies sit anywhere on disk. Let Vite
// serve files (fonts) from each dependency's real folder.
const require = createRequire(import.meta.url)
const depDirs = Object.keys(pkg.dependencies).flatMap((name) => {
  try {
    return [fs.realpathSync(path.dirname(require.resolve(`${name}/package.json`)))]
  } catch {
    return [] // package.json not exported; not a file-serving dependency
  }
})

export default defineConfig({
  plugins: [react(), tailwindcss(), sketches(sketchDir)],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  server: { fs: { allow: [searchForWorkspaceRoot(import.meta.dirname), ...depDirs] } },
})
