import type { ComponentConfig, Slot } from '@puckeditor/core'
import { aligns, choices, gaps, justifies, sizeOptions, type Block, type Size } from '../options'

type RowProps = { gap: Size; justify: 'start' | 'center' | 'end' | 'between'; align: 'start' | 'center' | 'end'; items: Slot }

const config: ComponentConfig<RowProps> = {
  fields: {
    gap: { type: 'select', options: sizeOptions },
    justify: { type: 'radio', options: choices(['start', 'center', 'end', 'between']) },
    align: { type: 'radio', options: choices(['start', 'center', 'end']) },
    items: { type: 'slot' },
  },
  defaultProps: { gap: 'sm', justify: 'start', align: 'center', items: [] },
  render: ({ gap, justify, align, items: Items }) => (
    <Items className={`flex flex-row flex-wrap ${gaps[gap]} ${justifies[justify]} ${aligns[align]}`} />
  ),
}

export const block: Block = { name: 'Row', group: 'layout', config }
