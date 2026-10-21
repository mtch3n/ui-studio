import type { ComponentConfig } from '@puckeditor/core'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LabelledField } from '../labelled-field'
import { splitOptions, type Block } from '../options'

type SelectProps = { label: string; placeholder: string; options: string }

const config: ComponentConfig<SelectProps> = {
  fields: {
    label: { type: 'text' },
    placeholder: { type: 'text' },
    options: { type: 'text', label: 'Options (comma separated)' },
  },
  defaultProps: { label: 'Label', placeholder: 'Choose…', options: 'One, Two, Three' },
  render: ({ id, label, placeholder, options }) => (
    <LabelledField id={id} label={label}>
      <Select>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {splitOptions(options).map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </LabelledField>
  ),
}

export const block: Block = { name: 'Select', group: 'forms', config }
