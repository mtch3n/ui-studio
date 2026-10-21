import type { ComponentConfig } from '@puckeditor/core'
import { Badge } from '@/components/ui/badge'
import { choices, type Block } from '../options'

type BadgeProps = {
  label: string
  variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
}

const config: ComponentConfig<BadgeProps> = {
  fields: {
    label: { type: 'text' },
    variant: { type: 'select', options: choices(['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']) },
  },
  defaultProps: { label: 'Badge', variant: 'default' },
  render: ({ label, variant }) => <Badge variant={variant}>{label}</Badge>,
}

export const block: Block = { name: 'Badge', group: 'content', config }
