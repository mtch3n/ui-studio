import { FieldLabel, type Config, type CustomField, type Slot } from '@puckeditor/core'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formComponents, type FormProps } from './forms'
import { ThemeFrame, type Theme } from './theme'

type Size = 'none' | 'sm' | 'md' | 'lg'

const gaps: Record<Size, string> = { none: 'gap-0', sm: 'gap-2', md: 'gap-4', lg: 'gap-8' }
const paddings: Record<Size, string> = { none: 'p-0', sm: 'p-2', md: 'p-4', lg: 'p-8' }

const aligns = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' }
const justifies = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between' }

const sizeOptions = (['none', 'sm', 'md', 'lg'] as const).map((value) => ({ label: value, value }))

const textStyles = {
  title: 'text-3xl font-semibold tracking-tight',
  heading: 'text-xl font-semibold',
  body: 'text-base',
  muted: 'text-sm text-muted-foreground',
  small: 'text-xs text-muted-foreground',
}

type Props = {
  Stack: { gap: Size; padding: Size; align: 'start' | 'center' | 'stretch'; items: Slot }
  Row: { gap: Size; justify: 'start' | 'center' | 'end' | 'between'; align: 'start' | 'center' | 'end'; items: Slot }
  Text: { text: string; style: keyof typeof textStyles }
  Button: {
    label: string
    variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
    size: 'sm' | 'default' | 'lg'
    width: 'auto' | 'full'
  }
  Card: { title: string; description: string; items: Slot }
} & FormProps

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

export const config: Config<Props, RootProps> = {
  categories: {
    layout: { title: 'Layout', components: ['Stack', 'Row', 'Card'] },
    content: { title: 'Content', components: ['Text', 'Button'] },
    forms: { title: 'Forms', components: ['Input', 'Textarea', 'Select', 'Checkbox', 'RadioGroup', 'Switch'] },
  },
  root: {
    fields: {
      title: { type: 'text', label: 'Variant title' },
      notes: { type: 'textarea', label: 'Notes (open questions)' },
      primary: colorField,
      radius: {
        type: 'select',
        label: 'Radius',
        options: ['0rem', '0.375rem', '0.625rem', '1rem'].map((value) => ({ label: value, value })),
      },
      font: { type: 'radio', label: 'Font', options: ['sans', 'serif', 'mono'].map((value) => ({ label: value, value })) },
      mode: { type: 'radio', label: 'Mode', options: ['light', 'dark'].map((value) => ({ label: value, value })) },
    },
    defaultProps: { ...defaultTheme, title: '', notes: '' },
    render: ({ children, primary, radius, font, mode }) => (
      <ThemeFrame theme={{ primary, radius, font, mode }}>{children}</ThemeFrame>
    ),
  },
  components: {
    Stack: {
      fields: {
        gap: { type: 'select', options: sizeOptions },
        padding: { type: 'select', options: sizeOptions },
        align: { type: 'radio', options: ['start', 'center', 'stretch'].map((value) => ({ label: value, value })) },
        items: { type: 'slot' },
      },
      defaultProps: { gap: 'md', padding: 'none', align: 'stretch', items: [] },
      render: ({ gap, padding, align, items: Items }) => (
        <Items className={`flex flex-col ${gaps[gap]} ${paddings[padding]} ${aligns[align]}`} />
      ),
    },
    Row: {
      fields: {
        gap: { type: 'select', options: sizeOptions },
        justify: { type: 'radio', options: ['start', 'center', 'end', 'between'].map((value) => ({ label: value, value })) },
        align: { type: 'radio', options: ['start', 'center', 'end'].map((value) => ({ label: value, value })) },
        items: { type: 'slot' },
      },
      defaultProps: { gap: 'sm', justify: 'start', align: 'center', items: [] },
      render: ({ gap, justify, align, items: Items }) => (
        <Items className={`flex flex-row flex-wrap ${gaps[gap]} ${justifies[justify]} ${aligns[align]}`} />
      ),
    },
    Text: {
      fields: {
        text: { type: 'textarea' },
        style: { type: 'select', options: Object.keys(textStyles).map((value) => ({ label: value, value })) },
      },
      defaultProps: { text: 'Text', style: 'body' },
      render: ({ text, style }) => <p className={textStyles[style]}>{text}</p>,
    },
    Button: {
      fields: {
        label: { type: 'text' },
        variant: {
          type: 'select',
          options: ['default', 'outline', 'secondary', 'ghost', 'link', 'destructive'].map((value) => ({ label: value, value })),
        },
        size: { type: 'radio', options: ['sm', 'default', 'lg'].map((value) => ({ label: value, value })) },
        width: { type: 'radio', options: ['auto', 'full'].map((value) => ({ label: value, value })) },
      },
      defaultProps: { label: 'Button', variant: 'default', size: 'default', width: 'auto' },
      render: ({ label, variant, size, width }) => (
        <Button variant={variant} size={size} className={width === 'full' ? 'w-full' : undefined}>
          {label}
        </Button>
      ),
    },
    Card: {
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        items: { type: 'slot' },
      },
      defaultProps: { title: 'Card title', description: '', items: [] },
      render: ({ title, description, items: Items }) => (
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <Items className="flex flex-col gap-4" />
          </CardContent>
        </Card>
      ),
    },
    ...formComponents,
  },
}
