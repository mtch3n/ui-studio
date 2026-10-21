import type { ComponentConfig } from '@puckeditor/core'
import { Textarea } from '@/components/ui/textarea'
import { LabelledField } from '../labelled-field'
import type { Block } from '../options'

type TextareaProps = { label: string; placeholder: string }

const config: ComponentConfig<TextareaProps> = {
  fields: { label: { type: 'text' }, placeholder: { type: 'text' } },
  defaultProps: { label: 'Label', placeholder: '' },
  render: ({ id, label, placeholder }) => (
    <LabelledField id={id} label={label}>
      <Textarea id={id} placeholder={placeholder} />
    </LabelledField>
  ),
}

export const block: Block = { name: 'Textarea', group: 'forms', config }
