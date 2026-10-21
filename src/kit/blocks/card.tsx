import type { ComponentConfig, Slot } from '@puckeditor/core'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Block } from '../options'

type CardProps = { title: string; description: string; items: Slot }

const config: ComponentConfig<CardProps> = {
  fields: {
    title: { type: 'text' },
    description: { type: 'textarea' },
    items: { type: 'slot' },
  },
  defaultProps: { title: 'Card title', description: '', items: [] },
  render: ({ title, description, items: Items }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Items className="flex flex-col gap-4" />
      </CardContent>
    </Card>
  ),
}

export const block: Block = { name: 'Card', group: 'layout', config }
