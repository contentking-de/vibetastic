"use client"

import { useState } from "react"
import { updateAddress } from "./actions"

type Props = {
  memberId: string
  initial: {
    fullName: string
    company: string
    street: string
    zip: string
    city: string
    country: string
  }
  isAdmin?: boolean
}

export default function AddressForm({ memberId, initial, isAdmin }: Props) {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      await updateAddress(form, isAdmin ? memberId : undefined)
      setSaved(true)
    } catch {
      setError("Fehler beim Speichern. Bitte versuche es erneut.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vollständiger Name" value={form.fullName} onChange={(v) => set("fullName", v)} placeholder="Max Mustermann" />
        <Field label="Firma (optional)" value={form.company} onChange={(v) => set("company", v)} placeholder="Muster GmbH" />
      </div>

      <Field label="Straße & Hausnummer" value={form.street} onChange={(v) => set("street", v)} placeholder="Musterstraße 1" />

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="PLZ" value={form.zip} onChange={(v) => set("zip", v)} placeholder="12345" />
        <div className="sm:col-span-2">
          <Field label="Stadt" value={form.city} onChange={(v) => set("city", v)} placeholder="Berlin" />
        </div>
      </div>

      <Field label="Land" value={form.country} onChange={(v) => set("country", v)} placeholder="Deutschland" />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-bg hover:bg-ink/85 transition-colors disabled:opacity-50"
        >
          {saving ? "Speichern…" : "Adresse speichern"}
        </button>
        {saved && (
          <span className="text-sm text-green-600 flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Gespeichert
          </span>
        )}
      </div>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider mb-1.5 block">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-colors"
      />
    </label>
  )
}
