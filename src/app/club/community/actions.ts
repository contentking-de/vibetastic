"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { forumChannels, forumMessages, users, members } from "@/lib/db/schema"
import { eq, desc, asc, sql, and, ne, isNotNull } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { getResend } from "@/lib/resend"

export async function getChannels() {
  return db
    .select()
    .from(forumChannels)
    .orderBy(asc(forumChannels.sortOrder))
}

export async function getChannelBySlug(slug: string) {
  const result = await db
    .select()
    .from(forumChannels)
    .where(eq(forumChannels.slug, slug))
    .limit(1)
  return result[0] ?? null
}

export async function getMessages(channelId: string) {
  return db
    .select({
      id: forumMessages.id,
      content: forumMessages.content,
      attachments: forumMessages.attachments,
      createdAt: forumMessages.createdAt,
      parentId: forumMessages.parentId,
      userId: forumMessages.userId,
      userName: users.name,
      userEmail: users.email,
      userImage: users.image,
    })
    .from(forumMessages)
    .innerJoin(users, eq(forumMessages.userId, users.id))
    .where(
      and(
        eq(forumMessages.channelId, channelId),
        sql`${forumMessages.parentId} IS NULL`
      )
    )
    .orderBy(desc(forumMessages.createdAt))
    .limit(100)
}

export async function getReplies(parentId: string) {
  return db
    .select({
      id: forumMessages.id,
      content: forumMessages.content,
      attachments: forumMessages.attachments,
      createdAt: forumMessages.createdAt,
      parentId: forumMessages.parentId,
      userId: forumMessages.userId,
      userName: users.name,
      userEmail: users.email,
      userImage: users.image,
    })
    .from(forumMessages)
    .innerJoin(users, eq(forumMessages.userId, users.id))
    .where(eq(forumMessages.parentId, parentId))
    .orderBy(asc(forumMessages.createdAt))
}

export async function getReplyCount(messageId: string) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(forumMessages)
    .where(eq(forumMessages.parentId, messageId))
  return Number(result[0]?.count ?? 0)
}

export async function getReplyCountsForMessages(messageIds: string[]) {
  if (messageIds.length === 0) return {}
  const results = await db
    .select({
      parentId: forumMessages.parentId,
      count: sql<number>`count(*)`,
    })
    .from(forumMessages)
    .where(sql`${forumMessages.parentId} IN ${messageIds}`)
    .groupBy(forumMessages.parentId)

  const map: Record<string, number> = {}
  for (const r of results) {
    if (r.parentId) map[r.parentId] = Number(r.count)
  }
  return map
}

export async function sendMessage(channelId: string, content: string, parentId?: string, attachments?: string[]) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Nicht eingeloggt")

  const trimmed = content.trim()
  const hasAttachments = attachments && attachments.length > 0
  if (!trimmed && !hasAttachments) throw new Error("Nachricht darf nicht leer sein")
  if (trimmed.length > 4000) throw new Error("Nachricht ist zu lang")

  await db.insert(forumMessages).values({
    channelId,
    userId: session.user.id,
    content: trimmed || " ",
    attachments: hasAttachments ? JSON.stringify(attachments) : null,
    parentId: parentId ?? null,
  })

  const channel = await db
    .select({ slug: forumChannels.slug, name: forumChannels.name, emoji: forumChannels.emoji })
    .from(forumChannels)
    .where(eq(forumChannels.id, channelId))
    .limit(1)

  if (channel[0]) {
    revalidatePath(`/club/community/${channel[0].slug}`)
  }

  const authorName = session.user.name || session.user.email?.split("@")[0] || "Jemand"
  const channelName = channel[0]?.name ?? "Community"
  const channelEmoji = channel[0]?.emoji ?? "💬"
  const channelSlug = channel[0]?.slug ?? "allgemein"
  const isReply = !!parentId

  notifyMembers({
    authorEmail: session.user.email!,
    authorName,
    channelName,
    channelEmoji,
    channelSlug,
    content: trimmed,
    isReply,
  }).catch(() => {})
}

async function notifyMembers({
  authorEmail,
  authorName,
  channelName,
  channelEmoji,
  channelSlug,
  content,
  isReply,
}: {
  authorEmail: string
  authorName: string
  channelName: string
  channelEmoji: string
  channelSlug: string
  content: string
  isReply: boolean
}) {
  const allMembers = await db
    .select({ email: members.email })
    .from(members)
    .where(and(isNotNull(members.paidAt), ne(members.email, authorEmail)))

  const recipients = allMembers.map((m) => m.email).filter(Boolean)
  if (recipients.length === 0) return

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://vibetastic.de"
  const link = `${baseUrl}/club/community/${channelSlug}`
  const preview = content.length > 200 ? content.slice(0, 200) + "…" : content
  const subject = isReply
    ? `${authorName} hat in ${channelEmoji} ${channelName} geantwortet`
    : `${authorName} in ${channelEmoji} ${channelName}: Neuer Beitrag`

  const resend = getResend()

  await resend.batch.send(
    recipients.map((to) => ({
      from: "Vibetastic Club <noreply@vibetastic.de>",
      to,
      subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 0;">
          <p style="margin: 0 0 20px; color: #6e6a62; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em;">
            Vibetastic Club
          </p>
          <p style="margin: 0 0 16px; font-size: 15px; color: #0e0e10;">
            <strong>${authorName}</strong> hat ${isReply ? "eine Antwort" : "einen neuen Beitrag"} in <strong>${channelEmoji} ${channelName}</strong> geschrieben:
          </p>
          <div style="background: #f3efe7; border-radius: 10px; padding: 16px 20px; margin: 0 0 24px; font-size: 14px; color: #3a3a3e; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">
            ${preview.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}
          </div>
          <a href="${link}" style="display: inline-block; background: #0e0e10; color: #f3efe7; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none;">
            Zur Unterhaltung &rarr;
          </a>
          <p style="margin: 32px 0 0; font-size: 12px; color: #8a857c;">
            Du bekommst diese Mail, weil du Mitglied im Vibetastic Club bist.
          </p>
        </div>
      `,
    }))
  )
}

export async function deleteMessage(messageId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Nicht eingeloggt")

  const message = await db
    .select({ userId: forumMessages.userId, channelId: forumMessages.channelId })
    .from(forumMessages)
    .where(eq(forumMessages.id, messageId))
    .limit(1)

  if (!message[0]) throw new Error("Nachricht nicht gefunden")

  const isAuthor = message[0].userId === session.user.id
  const isAdmin = session.user.role === "admin"
  if (!isAuthor && !isAdmin) throw new Error("Keine Berechtigung")

  await db.delete(forumMessages).where(eq(forumMessages.id, messageId))

  const channel = await db
    .select({ slug: forumChannels.slug })
    .from(forumChannels)
    .where(eq(forumChannels.id, message[0].channelId))
    .limit(1)

  if (channel[0]) {
    revalidatePath(`/club/community/${channel[0].slug}`)
  }
}
