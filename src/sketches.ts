import type { Data } from '@puckeditor/core'
import { useEffect, useState } from 'react'

export type Index = Record<string, string[]>

export const sketchUrl = (screen: string, variant: string) => `/sketches/${screen}/${variant}.json`

export async function saveSketch(screen: string, variant: string, data: Data) {
  const res = await fetch(sketchUrl(screen, variant), { method: 'PUT', body: JSON.stringify(data) })
  if (!res.ok) throw new Error(`Save failed: ${res.status}`)
}

export function useJson<T>(url: string, refetchOnSketchChange = true) {
  const [value, setValue] = useState<T | null>()
  useEffect(() => {
    const load = () =>
      fetch(url, { cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : null))
        .then(setValue)
    load()
    if (!refetchOnSketchChange || !import.meta.hot) return
    import.meta.hot.on('sketches:changed', load)
    return () => import.meta.hot?.off('sketches:changed', load)
  }, [url, refetchOnSketchChange])
  return value
}
