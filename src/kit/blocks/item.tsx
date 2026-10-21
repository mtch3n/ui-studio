import type { ComponentConfig, Slot } from '@puckeditor/core'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { choices, type Block } from '../options'

type ItemProps = {
  title: string
  description: string
  variant: 'default' | 'outline' | 'muted'
  actions: Slot
}

const config: ComponentConfig<ItemProps> = {
  fields: {
    title: { type: 'text' },
    description: { type: 'text' },
    variant: { type: 'radio', options: choices(['default', 'outline', 'muted']) },
    actions: { type: 'slot' },
  },
  defaultProps: { title: 'Item title', description: '', variant: 'outline', actions: [] },
  render: ({ title, description, variant, actions: Actions }) => (
    <Item variant={variant}>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        {description && <ItemDescription>{description}</ItemDescription>}
      </ItemContent>
      <ItemActions>
        <Actions className="flex items-center gap-2" />
      </ItemActions>
    </Item>
  ),
}

export const block: Block = { name: 'Item', group: 'content', config }
