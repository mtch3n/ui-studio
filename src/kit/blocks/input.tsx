import type { ComponentConfig } from '@puckeditor/core'
import { Input } from '@/components/ui/input'
import { LabelledField } from '../labelled-field'
import { choices, type Block } from '../options'

type InputProps = { label: string; placeholder: string; type: 'text' | 'email' | 'tel' | 'password' | 'number' }

const config: ComponentConfig<InputProps> = {
  fields: {
    label: { type: 'text' },
    placeholder: { type: 'text' },
    type: { type: 'select', options: choices(['text', 'email', 'tel', 'password', 'number']) },
  },
  defaultProps: { label: 'Label', placeholder: '', type: 'text' },
  render: ({ id, label, placeholder, type }) => (
    <LabelledField id={id} label={label}>
      <Input id={id} type={type} placeholder={placeholder} />
    </LabelledField>
  ),
}

export const block: Block = { name: 'Input', group: 'forms', config }
