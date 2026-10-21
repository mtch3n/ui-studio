import type { ComponentConfig, Slot } from '@puckeditor/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { choices, splitOptions, type Block } from '../options'

type TabsProps = {
  tabs: string
  selected: string
  variant: 'default' | 'line'
  width: 'auto' | 'full'
  items: Slot
}

const widths = { auto: 'w-fit', full: 'w-full' }

const config: ComponentConfig<TabsProps> = {
  fields: {
    tabs: { type: 'text' },
    selected: { type: 'text' },
    variant: { type: 'radio', options: choices(['default', 'line']) },
    width: { type: 'radio', options: choices(['auto', 'full']) },
    items: { type: 'slot' },
  },
  defaultProps: { tabs: 'Overview, Details', selected: 'Overview', variant: 'default', width: 'auto', items: [] },
  render: ({ tabs, selected, variant, width, items: Items }) => {
    const labels = splitOptions(tabs)
    const active = labels.includes(selected.trim()) ? selected.trim() : labels[0]
    return (
      <Tabs value={active}>
        <TabsList variant={variant} className={widths[width]}>
          {labels.map((label) => (
            <TabsTrigger key={label} value={label}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={active}>
          <Items className="flex flex-col gap-4" />
        </TabsContent>
      </Tabs>
    )
  },
}

export const block: Block = { name: 'Tabs', group: 'navigation', config }
