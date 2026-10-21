import type { ComponentConfig } from '@puckeditor/core'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { choices, onOff, type Block } from '../options'

type AvatarSize = 'sm' | 'md' | 'lg'

type AvatarProps = {
  name: string
  size: AvatarSize
  caption: boolean
}

const avatarSizes: Record<AvatarSize, 'sm' | 'default' | 'lg'> = { sm: 'sm', md: 'default', lg: 'lg' }

const initials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  if (words.length === 1) return words[0][0].toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

const config: ComponentConfig<AvatarProps> = {
  fields: {
    name: { type: 'text' },
    size: { type: 'radio', options: choices(['sm', 'md', 'lg']) },
    caption: { type: 'radio', options: onOff },
  },
  defaultProps: { name: 'Dana Lee', size: 'md', caption: false },
  render: ({ name, size, caption }) => (
    <div className="flex items-center gap-2">
      <Avatar size={avatarSizes[size]}>
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
      {caption ? <span className="text-sm font-medium">{name}</span> : null}
    </div>
  ),
}

export const block: Block = { name: 'Avatar', group: 'content', config }
