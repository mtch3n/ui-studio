import { FieldLabel, type Config, type CustomField } from '@puckeditor/core'
import { choices, groups, type Block } from './options'
import { ThemeFrame, type Theme } from './theme'

export type RootProps = Theme & { title: string; notes: string }

const defaultTheme: Theme = { primary: '#171717', radius: '0.625rem', font: 'sans', mode: 'light' }

const colorField: CustomField<string> = {
  type: 'custom',
  label: 'Primary colour',
  render: ({ field, value, onChange }) => (
    <FieldLabel label={field.label ?? ''}>
      <input type="color" value={value} onChange={(e) => onChange(e.currentTarget.value)} className="h-8 w-full" />
    </FieldLabel>
  ),
}

const blocks = Object.values(import.meta.glob<{ block: Block }>('./blocks/*.tsx', { eager: true }))
  .map((module) => module.block)
  .sort((a, b) => a.name.localeCompare(b.name))

export const config: Config<{ root: RootProps }> = {
  categories: Object.fromEntries(
    Object.entries(groups).map(([group, title]) => [
      group,
      { title, components: blocks.filter((block) => block.group === group).map((block) => block.name) },
    ]),
  ),
  root: {
    fields: {
      title: { type: 'text', label: 'Variant title' },
      notes: { type: 'textarea', label: 'Notes (open questions)' },
      primary: colorField,
      radius: { type: 'select', label: 'Radius', options: choices(['0rem', '0.375rem', '0.625rem', '1rem']) },
      font: { type: 'radio', label: 'Font', options: choices(['sans', 'serif', 'mono']) },
      mode: { type: 'radio', label: 'Mode', options: choices(['light', 'dark']) },
    },
    defaultProps: { ...defaultTheme, title: '', notes: '' },
    render: ({ children, primary, radius, font, mode }) => (
      <ThemeFrame theme={{ primary, radius, font, mode }}>{children}</ThemeFrame>
    ),
  },
  components: Object.fromEntries(blocks.map((block) => [block.name, block.config])),
}
