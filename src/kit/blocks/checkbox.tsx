import type { ComponentConfig } from '@puckeditor/core'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { onOff, type Block } from '../options'

type CheckboxProps = { label: string; checked: boolean }

const config: ComponentConfig<CheckboxProps> = {
  fields: { label: { type: 'text' }, checked: { type: 'radio', options: onOff } },
  defaultProps: { label: 'Label', checked: false },
  render: ({ label, checked }) => (
    <Label className="font-normal">
      <Checkbox checked={checked} />
      {label}
    </Label>
  ),
}

export const block: Block = { name: 'Checkbox', group: 'forms', config }
