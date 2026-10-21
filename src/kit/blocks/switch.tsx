import type { ComponentConfig } from '@puckeditor/core'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { onOff, type Block } from '../options'

type SwitchProps = { label: string; checked: boolean }

const config: ComponentConfig<SwitchProps> = {
  fields: { label: { type: 'text' }, checked: { type: 'radio', options: onOff } },
  defaultProps: { label: 'Label', checked: false },
  render: ({ label, checked }) => (
    <Label className="justify-between font-normal">
      {label}
      <Switch checked={checked} />
    </Label>
  ),
}

export const block: Block = { name: 'Switch', group: 'forms', config }
