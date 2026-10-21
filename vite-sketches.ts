import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

const NAME = /^[\w-]+$/

function readIndex(dir: string): Record<string, string[]> {
  const index: Record<string, string[]> = {}
  if (!fs.existsSync(dir)) return index
  for (const screen of fs.readdirSync(dir).sort()) {
    if (!NAME.test(screen) || !fs.statSync(path.join(dir, screen)).isDirectory()) continue
    index[screen] = fs
      .readdirSync(path.join(dir, screen))
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.slice(0, -'.json'.length))
      .sort()
  }
  return index
}

export function sketches(dir: string): Plugin {
  return {
    name: 'ui-studio-sketches',
    configureServer(server) {
      server.watcher.add(dir)
      server.watcher.on('all', (_event, file) => {
        if (file.startsWith(dir + path.sep)) server.ws.send({ type: 'custom', event: 'sketches:changed' })
      })
      server.middlewares.use('/sketches', (req, res, next) => {
        const url = (req.url ?? '/').split('?')[0]
        if (url === '/index.json') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(readIndex(dir)))
          return
        }
        const match = url.match(/^\/([\w-]+)\/([\w-]+)\.json$/)
        if (!match) return next()
        const file = path.join(dir, match[1], `${match[2]}.json`)
        if (req.method === 'PUT') {
          let body = ''
          req.on('data', (chunk) => (body += chunk))
          req.on('end', () => {
            fs.mkdirSync(path.dirname(file), { recursive: true })
            fs.writeFileSync(file, JSON.stringify(JSON.parse(body), null, 2) + '\n')
            res.end('{}')
          })
          return
        }
        if (!fs.existsSync(file)) {
          res.statusCode = 404
          res.end()
          return
        }
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')
        res.end(fs.readFileSync(file))
      })
    },
    generateBundle() {
      const index = readIndex(dir)
      this.emitFile({ type: 'asset', fileName: 'sketches/index.json', source: JSON.stringify(index) })
      for (const [screen, variants] of Object.entries(index)) {
        for (const variant of variants) {
          const source = fs.readFileSync(path.join(dir, screen, `${variant}.json`))
          this.emitFile({ type: 'asset', fileName: `sketches/${screen}/${variant}.json`, source })
        }
      }
    },
  }
}
