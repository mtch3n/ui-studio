import type { ComponentConfig, Slot } from '@puckeditor/core'
import { aligns, choices, gaps, paddings, sizeOptions, type Block, type Size } from '../options'

type StackProps = { gap: Size; padding: Size; align: 'start' | 'center' | 'stretch'; items: Slot }

const config: ComponentConfig<StackProps> = {
  fields: {
    gap: { type: 'select', options: sizeOptions },
    padding: { type: 'select', options: sizeOptions },
    align: { type: 'radio', options: choices(['start', 'center', 'stretch']) },
    items: { type: 'slot' },
  },
  defaultProps: { gap: 'md', padding: 'none', align: 'stretch', items: [] },
  render: ({ gap, padding, align, items: Items }) => (
    <Items className={`flex flex-col ${gaps[gap]} ${paddings[padding]} ${aligns[align]}`} />
  ),
}

export const block: Block = { name: 'Stack', group: 'layout', config }
