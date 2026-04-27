"use client"

import { useState, useTransition } from "react"
import { deleteMessage } from "@/app/club/community/actions"
import ThreadPanel from "./ThreadPanel"

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

function parseAttachments(attachments: string | null): string[] {
  if (!attachments) return []
  try { return JSON.parse(attachments) } catch { return [] }
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
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
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

export default function MessageList({
  messages,
  currentUserId,
  isAdmin,
  channelId,
  replyCounts,
}: {
  messages: Message[]
  currentUserId: string
  isAdmin: boolean
  channelId: string
  replyCounts: Record<string, number>
}) {
  const [activeThread, setActiveThread] = useState<Message | null>(null)

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-ink-mute text-sm">
        <div className="text-center">
          <div className="text-4xl mb-3">💬</div>
          <p>Noch keine Nachrichten in diesem Kanal.</p>
          <p className="mt-1">Starte die Unterhaltung!</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto space-y-1 py-4">
        {[...messages].reverse().map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
            replyCount={replyCounts[msg.id] ?? 0}
            onOpenThread={() => setActiveThread(msg)}
          />
        ))}
      </div>

      {activeThread && (
        <ThreadPanel
          parentMessage={activeThread}
          channelId={channelId}
          currentUserId={currentUserId}
          isAdmin={isAdmin}
          onClose={() => setActiveThread(null)}
        />
      )}
    </>
  )
}

function MessageItem({
  message,
  currentUserId,
  isAdmin,
  replyCount,
  onOpenThread,
}: {
  message: Message
  currentUserId: string
  isAdmin: boolean
  replyCount: number
  onOpenThread: () => void
}) {
  const [showActions, setShowActions] = useState(false)
  const [isPending, startTransition] = useTransition()
  const canDelete = message.userId === currentUserId || isAdmin
  const displayName = message.userName || message.userEmail?.split("@")[0] || "Anonym"

  function handleDelete() {
    if (!confirm("Nachricht wirklich löschen?")) return
    startTransition(async () => {
      await deleteMessage(message.id)
    })
  }

  return (
    <div
      className={`group flex gap-3 px-4 py-2.5 rounded-lg transition-colors hover:bg-bg-soft/50 ${
        isPending ? "opacity-40" : ""
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5 ${getAvatarColor(
          message.userId
        )}`}
      >
        {getInitials(message.userName, message.userEmail)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sm">{displayName}</span>
          <span className="text-xs text-ink-mute">{timeAgo(message.createdAt)}</span>
        </div>
        <div
          className="text-sm leading-relaxed text-ink-soft mt-0.5 break-words"
          dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
        />

        <ImageAttachments attachments={message.attachments} />

        {replyCount > 0 && (
          <button
            onClick={onOpenThread}
            className="mt-1.5 text-xs text-accent font-medium hover:underline"
          >
            {replyCount} {replyCount === 1 ? "Antwort" : "Antworten"}
          </button>
        )}
      </div>

      <div
        className={`flex items-start gap-1 shrink-0 transition-opacity ${
          showActions ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={onOpenThread}
          className="p-1.5 rounded-md hover:bg-bg-soft text-ink-mute hover:text-ink transition-colors"
          title="Antworten"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
          </svg>
        </button>
        {canDelete && (
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-md hover:bg-red-50 text-ink-mute hover:text-red-600 transition-colors"
            title="Löschen"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

function ImageAttachments({ attachments }: { attachments: string | null }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const urls = parseAttachments(attachments)
  if (urls.length === 0) return null

  return (
    <>
      <div className={`mt-2 flex gap-2 flex-wrap ${urls.length === 1 ? "" : ""}`}>
        {urls.map((url, i) => (
          <button
            key={i}
            onClick={() => setExpanded(url)}
            className="block rounded-lg overflow-hidden border border-line hover:border-ink/20 transition-colors"
          >
            <img
              src={url}
              alt={`Anhang ${i + 1}`}
              className="max-h-52 max-w-xs object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm cursor-zoom-out"
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
