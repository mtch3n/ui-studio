import type { CSSProperties, ReactNode } from 'react'

export type Theme = {
  primary: string
  radius: string
  font: 'sans' | 'serif' | 'mono'
  mode: 'light' | 'dark'
}

const fonts: Record<Theme['font'], string> = {
  sans: "'Geist Variable', sans-serif",
  serif: 'ui-serif, Georgia, serif',
  mono: 'ui-monospace, monospace',
}

function readableTextOn(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.299 * r + 0.587 * g + 0.114 * b > 0.6 ? '#171717' : '#fafafa'
}

export function ThemeFrame({ theme, children }: { theme: Theme; children: ReactNode }) {
  const style = {
    '--primary': theme.primary,
    '--primary-foreground': readableTextOn(theme.primary),
    '--ring': theme.primary,
    '--radius': theme.radius,
    fontFamily: fonts[theme.font],
  } as CSSProperties
  return (
    <div className={`${theme.mode === 'dark' ? 'dark ' : ''}min-h-full bg-background text-foreground`} style={style}>
      {children}
    </div>
  )
}
