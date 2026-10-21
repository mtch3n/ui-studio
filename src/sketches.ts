import type { Data } from '@puckeditor/core'
import { useEffect, useState } from 'react'

// Sketch files are served at /sketches/ by vite-sketches.ts (dev) or as static files (build).

export type Index = Record<string, string[]>

export const sketchUrl = (screen: string, variant: string) => `/sketches/${screen}/${variant}.json`

export async function saveSketch(screen: string, variant: string, data: Data) {
  const res = await fetch(sketchUrl(screen, variant), { method: 'PUT', body: JSON.stringify(data) })
  if (!res.ok) throw new Error(`Save failed: ${res.status}`)
}

// undefined while loading, null when the file doesn't exist.
export function useJson<T>(url: string) {
  const [value, setValue] = useState<T | null>()
  useEffect(() => {
    fetch(url, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then(setValue)
  }, [url])
  return value
}
