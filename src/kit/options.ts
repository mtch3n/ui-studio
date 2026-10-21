import type { ComponentConfig } from '@puckeditor/core'

export const groups = {
  layout: 'Layout',
  content: 'Content',
  actions: 'Actions',
  forms: 'Forms',
  navigation: 'Navigation',
  feedback: 'Feedback',
} as const

export type Block = {
  name: string
  group: keyof typeof groups
  config: ComponentConfig<any>
}

export type Size = 'none' | 'sm' | 'md' | 'lg'

export const gaps: Record<Size, string> = { none: 'gap-0', sm: 'gap-2', md: 'gap-4', lg: 'gap-8' }
export const paddings: Record<Size, string> = { none: 'p-0', sm: 'p-2', md: 'p-4', lg: 'p-8' }
export const aligns = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' }
export const justifies = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between' }

export const choices = <T extends string>(values: readonly T[]) => values.map((value) => ({ label: value, value }))

export const sizeOptions = choices(['none', 'sm', 'md', 'lg'] as const)

export const onOff = [
  { label: 'on', value: true },
  { label: 'off', value: false },
]

export const splitOptions = (options: string) =>
  options
    .split(',')
    .map((option) => option.trim())
    .filter(Boolean)
