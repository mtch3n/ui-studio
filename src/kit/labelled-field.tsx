import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'

export function LabelledField({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
    </div>
  )
}
