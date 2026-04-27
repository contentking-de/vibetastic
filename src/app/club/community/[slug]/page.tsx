import { notFound } from "next/navigation"
import { auth } from "@/lib/auth"
import {
  getChannelBySlug,
  getMessages,
  getReplyCountsForMessages,
} from "../actions"
import MessageList from "@/components/club/MessageList"
import MessageInput from "@/components/club/MessageInput"

export default async function ChannelPage({
  params,
}: {
  params: { slug: string }
}) {
  const [session, channel] = await Promise.all([
    auth(),
    getChannelBySlug(params.slug),
  ])

  if (!channel) notFound()
  if (!session?.user?.id) notFound()

  const messages = await getMessages(channel.id)
  const messageIds = messages.map((m) => m.id)
  const replyCounts = await getReplyCountsForMessages(messageIds)

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-12rem)]">
      <div className="flex items-center gap-3 pb-4 mb-2 border-b border-line">
        <span className="text-2xl">{channel.emoji}</span>
        <div>
          <h2 className="text-lg font-bold leading-tight">{channel.name}</h2>
          {channel.description && (
            <p className="text-sm text-ink-mute">{channel.description}</p>
          )}
        </div>
      </div>

      <MessageList
        messages={messages}
        currentUserId={session.user.id}
        isAdmin={session.user.role === "admin"}
        channelId={channel.id}
        replyCounts={replyCounts}
      />

      <div className="pt-4 mt-auto">
        <MessageInput
          channelId={channel.id}
          placeholder={`Nachricht an #${channel.name}…`}
        />
      </div>
    </div>
  )
}
