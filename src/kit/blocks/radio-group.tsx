import type { ComponentConfig } from '@puckeditor/core'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { LabelledField } from '../labelled-field'
import { splitOptions, type Block } from '../options'

type RadioGroupProps = { label: string; options: string; selected: string }

const config: ComponentConfig<RadioGroupProps> = {
  fields: {
    label: { type: 'text' },
    options: { type: 'text', label: 'Options (comma separated)' },
    selected: { type: 'text', label: 'Selected option' },
  },
  defaultProps: { label: 'Label', options: 'One, Two, Three', selected: 'One' },
  render: ({ id, label, options, selected }) => (
    <LabelledField id={id} label={label}>
      <RadioGroup value={selected}>
        {splitOptions(options).map((option) => (
          <Label key={option} className="font-normal">
            <RadioGroupItem value={option} />
            {option}
          </Label>
        ))}
      </RadioGroup>
    </LabelledField>
  ),
}

export const block: Block = { name: 'RadioGroup', group: 'forms', config }
