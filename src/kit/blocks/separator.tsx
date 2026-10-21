import type { ComponentConfig } from '@puckeditor/core'
import { Separator } from '@/components/ui/separator'
import { sizeOptions, type Block, type Size } from '../options'

type SeparatorProps = { label: string; spacing: Size }

const margins: Record<Size, string> = { none: 'my-0', sm: 'my-2', md: 'my-4', lg: 'my-8' }

const config: ComponentConfig<SeparatorProps> = {
  fields: {
    label: { type: 'text' },
    spacing: { type: 'select', options: sizeOptions },
  },
  defaultProps: { label: '', spacing: 'md' },
  render: ({ label, spacing }) =>
    label.trim() ? (
      <div className={`flex w-full items-center gap-3 ${margins[spacing]}`}>
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">{label}</span>
        <Separator className="flex-1" />
      </div>
    ) : (
      <Separator className={margins[spacing]} />
    ),
}

export const block: Block = { name: 'Separator', group: 'layout', config }
