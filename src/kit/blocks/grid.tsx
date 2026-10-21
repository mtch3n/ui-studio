import type { ComponentConfig, Slot } from '@puckeditor/core'
import { choices, gaps, sizeOptions, type Block, type Size } from '../options'

type Cols = '2' | '3' | '4'

type GridProps = { cols: Cols; gap: Size; items: Slot }

const columns: Record<Cols, string> = { '2': 'grid-cols-2', '3': 'grid-cols-3', '4': 'grid-cols-4' }

const config: ComponentConfig<GridProps> = {
  fields: {
    cols: { type: 'select', options: choices(['2', '3', '4']) },
    gap: { type: 'select', options: sizeOptions },
    items: { type: 'slot' },
  },
  defaultProps: { cols: '2', gap: 'md', items: [] },
  render: ({ cols, gap, items: Items }) => <Items className={`grid ${columns[cols]} ${gaps[gap]}`} />,
}

export const block: Block = { name: 'Grid', group: 'layout', config }
