import type { ComponentConfig } from '@puckeditor/core'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { choices, splitOptions, type Block } from '../options'

type ToggleGroupProps = {
  options: string
  selected: string
  variant: 'default' | 'outline'
  size: 'sm' | 'default' | 'lg'
  width: 'auto' | 'full'
}

const groupWidths = { auto: undefined, full: 'w-full' }
const itemWidths = { auto: undefined, full: 'flex-1' }

const config: ComponentConfig<ToggleGroupProps> = {
  fields: {
    options: { type: 'text', label: 'Options (comma separated)' },
    selected: { type: 'text', label: 'Selected option' },
    variant: { type: 'radio', options: choices(['default', 'outline']) },
    size: { type: 'radio', options: choices(['sm', 'default', 'lg']) },
    width: { type: 'radio', options: choices(['auto', 'full']) },
  },
  defaultProps: { options: 'Mon, Tue, Wed', selected: 'Mon', variant: 'outline', size: 'default', width: 'auto' },
  render: ({ options, selected, variant, size, width }) => (
    <ToggleGroup value={[selected]} variant={variant} size={size} className={groupWidths[width]}>
      {splitOptions(options).map((option) => (
        <ToggleGroupItem key={option} value={option} className={itemWidths[width]}>
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
}

export const block: Block = { name: 'ToggleGroup', group: 'actions', config }
