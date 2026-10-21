import type { ComponentConfig } from '@puckeditor/core'
import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { choices, type Block } from '../options'

type AlertProps = {
  title: string
  description: string
  variant: 'default' | 'destructive'
  icon: 'none' | 'info' | 'success' | 'warning' | 'error'
}

const icons = { none: null, info: Info, success: CircleCheck, warning: TriangleAlert, error: CircleX }

const config: ComponentConfig<AlertProps> = {
  fields: {
    title: { type: 'text' },
    description: { type: 'text' },
    variant: { type: 'radio', options: choices(['default', 'destructive']) },
    icon: { type: 'select', options: choices(['none', 'info', 'success', 'warning', 'error']) },
  },
  defaultProps: { title: 'Heads up', description: 'Something you should know.', variant: 'default', icon: 'info' },
  render: ({ title, description, variant, icon }) => {
    const Icon = icons[icon]
    return (
      <Alert variant={variant}>
        {Icon && <Icon />}
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    )
  },
}

export const block: Block = { name: 'Alert', group: 'feedback', config }
