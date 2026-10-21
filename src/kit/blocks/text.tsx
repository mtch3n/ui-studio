import type { ComponentConfig } from '@puckeditor/core'
import { choices, type Block } from '../options'

const textStyles = {
  title: 'text-3xl font-semibold tracking-tight',
  heading: 'text-xl font-semibold',
  body: 'text-base',
  muted: 'text-sm text-muted-foreground',
  small: 'text-xs text-muted-foreground',
}

type TextProps = { text: string; style: keyof typeof textStyles }

const config: ComponentConfig<TextProps> = {
  fields: {
    text: { type: 'textarea' },
    style: { type: 'select', options: choices(Object.keys(textStyles) as (keyof typeof textStyles)[]) },
  },
  defaultProps: { text: 'Text', style: 'body' },
  render: ({ text, style }) => <p className={textStyles[style]}>{text}</p>,
}

export const block: Block = { name: 'Text', group: 'content', config }
