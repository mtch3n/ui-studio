import type { Viewports } from '@puckeditor/core'

export const viewports: Viewports = [
  { width: 390, label: 'Phone', icon: 'Smartphone' },
  { width: 820, label: 'Tablet', icon: 'Tablet' },
  { width: 1280, label: 'Desktop', icon: 'Monitor' },
]

// Frame width for /view and /board: ?w=<px>, phone by default.
export const frameWidth = () => Number(new URLSearchParams(location.search).get('w') ?? 390)
