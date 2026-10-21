import type { ComponentConfig } from '@puckeditor/core'
import { ImageIcon } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { choices, onOff, type Block } from '../options'

type Ratio = '16:9' | '4:3' | '1:1' | '3:4'

type ImageSize = 'full' | 'sm' | 'md' | 'lg'

type ImageProps = { label: string; ratio: Ratio; size: ImageSize; rounded: boolean }

const ratios: Record<Ratio, number> = { '16:9': 16 / 9, '4:3': 4 / 3, '1:1': 1, '3:4': 3 / 4 }

const corners = { on: 'rounded-lg', off: 'rounded-none' }

const widths: Record<ImageSize, string> = { full: 'w-full', sm: 'w-16 shrink-0', md: 'w-24 shrink-0', lg: 'w-40 shrink-0' }

const config: ComponentConfig<ImageProps> = {
  fields: {
    label: { type: 'text' },
    ratio: { type: 'select', options: choices(['16:9', '4:3', '1:1', '3:4']) },
    size: { type: 'radio', options: choices(['full', 'sm', 'md', 'lg']) },
    rounded: { type: 'radio', options: onOff },
  },
  defaultProps: { label: 'Image', ratio: '16:9', size: 'full', rounded: true },
  render: ({ label, ratio, size, rounded }) => (
    <div className={widths[size]}>
      <AspectRatio
        ratio={ratios[ratio]}
        className={`flex flex-col items-center justify-center gap-2 overflow-hidden bg-muted text-muted-foreground ${rounded ? corners.on : corners.off}`}
      >
        <ImageIcon className="size-8" />
        {label && <span className="text-sm">{label}</span>}
      </AspectRatio>
    </div>
  ),
}

export const block: Block = { name: 'Image', group: 'layout', config }
