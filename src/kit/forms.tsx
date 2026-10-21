import type { Config } from '@puckeditor/core'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { LabelledField } from './labelled-field'

export type FormProps = {
  Input: { label: string; placeholder: string; type: 'text' | 'email' | 'tel' | 'password' | 'number' }
  Textarea: { label: string; placeholder: string }
  Select: { label: string; placeholder: string; options: string }
  Checkbox: { label: string; checked: boolean }
  RadioGroup: { label: string; options: string; selected: string }
  Switch: { label: string; checked: boolean }
}

const splitOptions = (options: string) =>
  options
    .split(',')
    .map((option) => option.trim())
    .filter(Boolean)

const onOff = [
  { label: 'on', value: true },
  { label: 'off', value: false },
]

export const formComponents: Config<FormProps>['components'] = {
  Input: {
    fields: {
      label: { type: 'text' },
      placeholder: { type: 'text' },
      type: { type: 'select', options: ['text', 'email', 'tel', 'password', 'number'].map((value) => ({ label: value, value })) },
    },
    defaultProps: { label: 'Label', placeholder: '', type: 'text' },
    render: ({ id, label, placeholder, type }) => (
      <LabelledField id={id} label={label}>
        <Input id={id} type={type} placeholder={placeholder} />
      </LabelledField>
    ),
  },
  Textarea: {
    fields: { label: { type: 'text' }, placeholder: { type: 'text' } },
    defaultProps: { label: 'Label', placeholder: '' },
    render: ({ id, label, placeholder }) => (
      <LabelledField id={id} label={label}>
        <Textarea id={id} placeholder={placeholder} />
      </LabelledField>
    ),
  },
  Select: {
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
  },
  Checkbox: {
    fields: { label: { type: 'text' }, checked: { type: 'radio', options: onOff } },
    defaultProps: { label: 'Label', checked: false },
    render: ({ label, checked }) => (
      <Label className="font-normal">
        <Checkbox checked={checked} />
        {label}
      </Label>
    ),
  },
  RadioGroup: {
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
  },
  Switch: {
    fields: { label: { type: 'text' }, checked: { type: 'radio', options: onOff } },
    defaultProps: { label: 'Label', checked: false },
    render: ({ label, checked }) => (
      <Label className="justify-between font-normal">
        {label}
        <Switch checked={checked} />
      </Label>
    ),
  },
}
