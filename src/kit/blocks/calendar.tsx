import type { ComponentConfig } from '@puckeditor/core'
import { Calendar } from '@/components/ui/calendar'
import { LabelledField } from '../labelled-field'
import type { Block } from '../options'

type CalendarProps = { label: string; month: string; selected: string }

const parseMonth = (value: string) => {
  const match = /^(\d{4})-(\d{2})$/.exec(value.trim())
  const month = match ? Number(match[2]) : 0
  if (!match || month < 1 || month > 12) {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  }
  return new Date(Number(match[1]), month - 1, 1)
}

const parseDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!match) return undefined
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])]
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : undefined
}

const config: ComponentConfig<CalendarProps> = {
  fields: {
    label: { type: 'text' },
    month: { type: 'text', label: 'Month (YYYY-MM)' },
    selected: { type: 'text', label: 'Selected (YYYY-MM-DD)' },
  },
  defaultProps: { label: '', month: '2026-10', selected: '2026-10-21' },
  render: ({ id, label, month, selected }) => (
    <LabelledField id={id} label={label}>
      <Calendar
        id={id}
        mode="single"
        month={parseMonth(month)}
        selected={parseDate(selected)}
        disableNavigation
        className="rounded-lg border"
        classNames={{ root: 'w-full', today: '' }}
      />
    </LabelledField>
  ),
}

export const block: Block = { name: 'Calendar', group: 'forms', config }
