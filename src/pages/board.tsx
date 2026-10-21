import { Render, type Data } from '@puckeditor/core'
import { config, type RootProps } from '@/kit/config'
import { sketchUrl, useJson, type Index } from '@/sketches'
import { frameWidth } from './viewports'

// All variants of one screen side by side: one screenshot of this page is the sketch board.
export function Board({ screen }: { screen: string }) {
  const index = useJson<Index>('/sketches/index.json')
  if (index === undefined) return null
  const variants = index?.[screen] ?? []
  return (
    <main className="flex min-h-screen flex-col gap-6 bg-muted p-10 text-foreground">
      <h1 className="text-2xl font-semibold">{screen}</h1>
      <div className="flex items-start gap-10">
        {variants.map((variant) => (
          <Variant key={variant} screen={screen} variant={variant} />
        ))}
      </div>
    </main>
  )
}

function Variant({ screen, variant }: { screen: string; variant: string }) {
  const data = useJson<Data>(sketchUrl(screen, variant))
  if (!data) return null
  const { title, notes } = (data.root.props ?? {}) as Partial<RootProps>
  const width = frameWidth()
  return (
    <figure className="flex flex-col gap-3" style={{ width }}>
      <figcaption className="flex items-baseline gap-2">
        <a href={`/edit/${screen}/${variant}`} className="font-semibold">
          {variant}
        </a>
        {title && <span className="text-muted-foreground">{title}</span>}
      </figcaption>
      <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
        <Render config={config} data={data} />
      </div>
      {notes && <p className="text-sm whitespace-pre-line text-muted-foreground">{notes}</p>}
    </figure>
  )
}
