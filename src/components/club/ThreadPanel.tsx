"use client"

import { useEffect, useState, useTransition, useCallback } from "react"
import { getReplies, deleteMessage } from "@/app/club/community/actions"
import MessageInput from "./MessageInput"

type Message = {
  id: string
  content: string
  attachments: string | null
  createdAt: Date | null
  parentId: string | null
  userId: string
  userName: string | null
  userEmail: string | null
  userImage: string | null
}

function parseAttachments(raw: string | null): string[] {
  if (!raw) return []
  try { return JSON.parse(raw) } catch { return [] }
}

function timeAgo(date: Date | null): string {
  if (!date) return ""
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "gerade eben"
  if (minutes < 60) return `vor ${minutes} Min.`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `vor ${hours} Std.`
  const days = Math.floor(hours / 24)
  if (days < 7) return `vor ${days} ${days === 1 ? "Tag" : "Tagen"}`
  return date.toLocaleDateString("de-DE", { day: "numeric", month: "short" })
}

function getInitials(name: string | null, email: string | null): string {
  if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
  return (email?.[0] ?? "?").toUpperCase()
}

const avatarColors = [
  "bg-amber-600", "bg-emerald-600", "bg-sky-600", "bg-violet-600",
  "bg-rose-600", "bg-teal-600", "bg-orange-600", "bg-indigo-600",
]

function getAvatarColor(userId: string): string {
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash + userId.charCodeAt(i)) | 0
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

function formatContent(content: string): string {
  return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>")
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-bg-soft font-mono text-xs">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
}

export default function ThreadPanel({
  parentMessage,
  channelId,
  currentUserId,
  isAdmin,
  onClose,
}: {
  parentMessage: Message
  channelId: string
  currentUserId: string
  isAdmin: boolean
  onClose: () => void
}) {
  const [replies, setReplies] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const loadReplies = useCallback(async () => {
    const data = await getReplies(parentMessage.id)
    setReplies(data as Message[])
    setLoading(false)
  }, [parentMessage.id])

  useEffect(() => {
    loadReplies()
  }, [loadReplies])

  const displayName = parentMessage.userName || parentMessage.userEmail?.split("@")[0] || "Anonym"

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-bg border-l border-line flex flex-col h-full shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h3 className="font-semibold text-sm">Thread</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-bg-soft text-ink-mute hover:text-ink transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div className="flex gap-3 pb-4 border-b border-line">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${getAvatarColor(
                parentMessage.userId
              )}`}
            >
              {getInitials(parentMessage.userName, parentMessage.userEmail)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-sm">{displayName}</span>
                <span className="text-xs text-ink-mute">{timeAgo(parentMessage.createdAt)}</span>
              </div>
              <div
                className="text-sm leading-relaxed text-ink-soft mt-0.5 break-words"
                dangerouslySetInnerHTML={{ __html: formatContent(parentMessage.content) }}
              />
              <InlineImages attachments={parentMessage.attachments} />
            </div>
          </div>

          {loading ? (
            <div className="text-center text-ink-mute text-sm py-8 animate-pulse">
              Lade Antworten…
            </div>
          ) : replies.length === 0 ? (
            <div className="text-center text-ink-mute text-sm py-8">
              Noch keine Antworten. Sei der Erste!
            </div>
          ) : (
            replies.map((reply) => (
              <ReplyItem
                key={reply.id}
                reply={reply}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
                onDeleted={loadReplies}
              />
            ))
          )}
        </div>

        <div className="p-4 border-t border-line">
          <MessageInput
            channelId={channelId}
            parentId={parentMessage.id}
            placeholder="Antwort schreiben…"
            onSent={loadReplies}
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}

function ReplyItem({
  reply,
  currentUserId,
  isAdmin,
  onDeleted,
}: {
  reply: Message
  currentUserId: string
  isAdmin: boolean
  onDeleted: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const canDelete = reply.userId === currentUserId || isAdmin
  const displayName = reply.userName || reply.userEmail?.split("@")[0] || "Anonym"

  function handleDelete() {
    if (!confirm("Antwort wirklich löschen?")) return
    startTransition(async () => {
      await deleteMessage(reply.id)
      onDeleted()
    })
  }

  return (
    <div className={`group flex gap-3 ${isPending ? "opacity-40" : ""}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5 ${getAvatarColor(
          reply.userId
        )}`}
      >
        {getInitials(reply.userName, reply.userEmail)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sm">{displayName}</span>
          <span className="text-xs text-ink-mute">{timeAgo(reply.createdAt)}</span>
          {canDelete && (
            <button
              onClick={handleDelete}
              className="ml-auto opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-ink-mute hover:text-red-600 transition-all"
              title="Löschen"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          )}
        </div>
        <div
          className="text-sm leading-relaxed text-ink-soft mt-0.5 break-words"
          dangerouslySetInnerHTML={{ __html: formatContent(reply.content) }}
        />
        <InlineImages attachments={reply.attachments} />
      </div>
    </div>
  )
}

function InlineImages({ attachments }: { attachments: string | null }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const urls = parseAttachments(attachments)
  if (urls.length === 0) return null

  return (
    <>
      <div className="mt-2 flex gap-2 flex-wrap">
        {urls.map((url, i) => (
          <button
            key={i}
            onClick={() => setExpanded(url)}
            className="block rounded-lg overflow-hidden border border-line hover:border-ink/20 transition-colors"
          >
            <img
              src={url}
              alt={`Anhang ${i + 1}`}
              className="max-h-40 max-w-[200px] object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {expanded && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setExpanded(null)}
        >
          <img
            src={expanded}
            alt="Vollbild"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  )
}
