import type { ComponentConfig } from '@puckeditor/core'
import { Button } from '@/components/ui/button'
import { choices, type Block } from '../options'

type ButtonProps = {
  label: string
  variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  size: 'sm' | 'default' | 'lg'
  width: 'auto' | 'full'
}

const config: ComponentConfig<ButtonProps> = {
  fields: {
    label: { type: 'text' },
    variant: { type: 'select', options: choices(['default', 'outline', 'secondary', 'ghost', 'link', 'destructive']) },
    size: { type: 'radio', options: choices(['sm', 'default', 'lg']) },
    width: { type: 'radio', options: choices(['auto', 'full']) },
  },
  defaultProps: { label: 'Button', variant: 'default', size: 'default', width: 'auto' },
  render: ({ label, variant, size, width }) => (
    <Button variant={variant} size={size} className={width === 'full' ? 'w-full' : undefined}>
      {label}
    </Button>
  ),
}

export const block: Block = { name: 'Button', group: 'actions', config }
