"use client"

import { useState, useRef, useTransition } from "react"
import { sendMessage } from "@/app/club/community/actions"

export default function MessageInput({
  channelId,
  parentId,
  placeholder = "Nachricht schreiben…",
  onSent,
  autoFocus = false,
}: {
  channelId: string
  parentId?: string
  placeholder?: string
  onSent?: () => void
  autoFocus?: boolean
}) {
  const [content, setContent] = useState("")
  const [attachments, setAttachments] = useState<{ url: string; name: string }[]>([])
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if ((!content.trim() && attachments.length === 0) || isPending || uploading) return

    const urls = attachments.map((a) => a.url)

    startTransition(async () => {
      await sendMessage(channelId, content, parentId, urls.length > 0 ? urls : undefined)
      setContent("")
      setAttachments([])
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
      onSent?.()
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
    const el = e.target
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 200) + "px"
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} ist zu groß (max. 5 MB)`)
          continue
        }

        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch("/api/upload", { method: "POST", body: formData })
        if (!res.ok) {
          const data = await res.json()
          alert(data.error || "Upload fehlgeschlagen")
          continue
        }

        const { url } = await res.json()
        setAttachments((prev) => [...prev, { url, name: file.name }])
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  function removeAttachment(index: number) {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  function handlePaste(e: React.ClipboardEvent) {
    const items = e.clipboardData?.items
    if (!items) return

    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        e.preventDefault()
        const file = item.getAsFile()
        if (!file) continue

        const fakeEvent = {
          target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>
        handleFileSelect(fakeEvent)
        break
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      {attachments.length > 0 && (
        <div className="flex gap-2 mb-2 flex-wrap">
          {attachments.map((att, i) => (
            <div key={i} className="relative group">
              <img
                src={att.url}
                alt={att.name}
                className="h-20 w-20 object-cover rounded-lg border border-line"
              />
              <button
                type="button"
                onClick={() => removeAttachment(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ink text-bg rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2 bg-bg-card border border-line rounded-xl p-2 shadow-sm focus-within:border-ink/30 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 p-2 rounded-lg text-ink-mute hover:text-ink hover:bg-bg-soft transition-all disabled:opacity-40"
          title="Bild hochladen"
        >
          {uploading ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
          )}
        </button>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={1}
          className="flex-1 bg-transparent resize-none px-2 py-1.5 text-sm outline-none placeholder:text-ink-mute min-h-[36px] max-h-[200px]"
        />
        <button
          type="submit"
          disabled={(!content.trim() && attachments.length === 0) || isPending || uploading}
          className="shrink-0 p-2 rounded-lg bg-ink text-bg disabled:opacity-30 hover:bg-ink-soft transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
      {isPending && (
        <div className="absolute -top-6 left-0 text-xs text-ink-mute animate-pulse">
          Wird gesendet…
        </div>
      )}
    </form>
  )
}
