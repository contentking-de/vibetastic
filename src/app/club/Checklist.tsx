"use client"

import { ReactNode, useOptimistic, useTransition } from "react"
import { toggleChecklistItem } from "./checklist-actions"

interface ChecklistItemProps {
  id: string
  label: string
  detail?: string
  href?: string
}

export function ChecklistSection({
  title,
  children,
  checkedIds,
}: {
  title: string
  children: ReactNode
  checkedIds: Set<string>
}) {
  const items = Array.isArray(children) ? children : [children]

  const sorted = [...items].sort((a, b) => {
    const aChecked = checkedIds.has(a?.props?.id) ? 1 : 0
    const bChecked = checkedIds.has(b?.props?.id) ? 1 : 0
    return aChecked - bChecked
  })

  return (
    <div>
      <h3 className="text-sm font-bold text-on-surface mb-4 uppercase tracking-wider opacity-60">
        {title}
      </h3>
      <div className="space-y-3">{sorted}</div>
    </div>
  )
}

export function ChecklistProvider({
  initialCheckedIds,
  children,
}: {
  initialCheckedIds: string[]
  children: (ctx: {
    checkedIds: Set<string>
    toggle: (id: string) => void
  }) => ReactNode
}) {
  const [optimistic, setOptimistic] = useOptimistic(
    new Set(initialCheckedIds),
    (state: Set<string>, itemId: string) => {
      const next = new Set(state)
      if (next.has(itemId)) next.delete(itemId)
      else next.add(itemId)
      return next
    }
  )
  const [, startTransition] = useTransition()

  function toggle(id: string) {
    const willBeChecked = !optimistic.has(id)
    startTransition(async () => {
      setOptimistic(id)
      await toggleChecklistItem(id, willBeChecked)
    })
  }

  return <>{children({ checkedIds: optimistic, toggle })}</>
}

export function ChecklistItem({
  id,
  label,
  detail,
  href,
  checked,
  onToggle,
}: ChecklistItemProps & { checked: boolean; onToggle: () => void }) {
  return (
    <label
      className={`flex items-start gap-3 cursor-pointer rounded-lg px-3 py-3 -mx-3 transition-all duration-300 ${
        checked
          ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/40"
          : "hover:bg-surface-container-high/40"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-1 w-4 h-4 rounded-sm border-outline-variant/40 text-green-600 focus:ring-green-500/30 shrink-0"
      />
      <div
        className={`transition-opacity duration-300 ${checked ? "opacity-70" : ""}`}
      >
        <span
          className={`font-medium transition-colors duration-300 ${
            checked
              ? "text-green-700 dark:text-green-400 line-through decoration-green-400/50"
              : "text-on-surface"
          }`}
        >
          {label}
        </span>
        {detail && (
          <span className="block text-sm text-on-surface-variant mt-0.5">
            {detail}
          </span>
        )}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-primary hover:underline mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            {href.replace(/^https?:\/\//, "")} &rarr;
          </a>
        )}
      </div>
      {checked && (
        <span className="ml-auto text-green-600 dark:text-green-400 text-xs font-medium shrink-0 mt-1">
          ✓ erledigt
        </span>
      )}
    </label>
  )
}
