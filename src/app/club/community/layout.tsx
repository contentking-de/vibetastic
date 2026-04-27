import { getChannels } from "./actions"
import ChannelSidebar from "@/components/club/ChannelSidebar"

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const channels = await getChannels()

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-12rem)]">
      <ChannelSidebar channels={channels} />
      <div className="flex-1 min-w-0 flex flex-col">{children}</div>
    </div>
  )
}
