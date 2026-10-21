import '@puckeditor/core/no-external.css'
import { Puck, type Data } from '@puckeditor/core'
import { config } from '@/kit/config'
import { saveSketch, sketchUrl, useJson } from '@/sketches'
import { viewports } from './viewports'

export function Edit({ screen, variant }: { screen: string; variant: string }) {
  const data = useJson<Data>(sketchUrl(screen, variant), false)
  if (data === undefined) return null
  return (
    <Puck
      config={config}
      data={data ?? {}}
      viewports={viewports}
      headerTitle={`${screen} / ${variant}`}
      overrides={{
        headerActions: ({ children }) => (
          <>
            <a href={`/board/${screen}`} className="text-sm underline">
              Board
            </a>
            {children}
          </>
        ),
      }}
      onPublish={(next) => saveSketch(screen, variant, next).catch((err) => alert(err.message))}
    />
  )
}
