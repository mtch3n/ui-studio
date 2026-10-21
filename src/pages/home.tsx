import { useJson, type Index } from '@/sketches'

export function Home() {
  const index = useJson<Index>('/sketches/index.json')
  if (index === undefined) return null
  const screens = Object.entries(index ?? {})
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-semibold">ui-studio</h1>
      {screens.length === 0 && <p className="text-muted-foreground">No sketches yet.</p>}
      {screens.map(([screen, variants]) => (
        <section key={screen} className="flex flex-col gap-2">
          <a href={`/board/${screen}`} className="text-lg font-medium underline">
            {screen}
          </a>
          <div className="flex gap-3 text-sm">
            {variants.map((variant) => (
              <a key={variant} href={`/edit/${screen}/${variant}`} className="text-muted-foreground underline">
                edit {variant}
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
