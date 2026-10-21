import { Render, type Data } from '@puckeditor/core'
import { config } from '@/kit/config'
import { sketchUrl, useJson } from '@/sketches'
import { frameWidth } from './viewports'

export function View({ screen, variant }: { screen: string; variant: string }) {
  const data = useJson<Data>(sketchUrl(screen, variant))
  if (data === undefined) return null
  if (data === null) return <p className="p-8 text-destructive">Missing: {sketchUrl(screen, variant)}</p>
  return (
    <main className="p-8">
      <div className="overflow-hidden rounded-xl border bg-background shadow-sm" style={{ width: frameWidth() }}>
        <Render config={config} data={data} />
      </div>
    </main>
  )
}
