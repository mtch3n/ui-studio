#!/usr/bin/env node
// ui-studio [dir] [--port <n>]        edit sketches in <dir> (default ./sketches)
// ui-studio build [dir] [--out <dir>]  static site for sharing (default ./sketch-site)
import path from 'node:path'
import { parseArgs } from 'node:util'
import { build, createServer } from 'vite'

const root = path.resolve(import.meta.dirname, '..')
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { port: { type: 'string' }, out: { type: 'string' } },
})
const isBuild = positionals[0] === 'build'
const dir = positionals[isBuild ? 1 : 0] ?? 'sketches'
process.env.SKETCH_DIR = path.resolve(dir)

if (isBuild) {
  const outDir = path.resolve(values.out ?? 'sketch-site')
  await build({ root, build: { outDir, emptyOutDir: true }, logLevel: 'warn' })
  console.log(`Built ${outDir}`)
} else {
  const server = await createServer({ root, server: { port: values.port ? Number(values.port) : 5173 } })
  await server.listen()
  console.log(`ui-studio: sketches in ${process.env.SKETCH_DIR}`)
  server.printUrls()
}
