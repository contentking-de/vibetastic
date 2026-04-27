import { redirect } from "next/navigation"
import { getChannels } from "./actions"

export default async function CommunityPage() {
  const channels = await getChannels()

  if (channels.length > 0) {
    redirect(`/club/community/${channels[0].slug}`)
  }

  return (
    <div className="flex-1 flex items-center justify-center text-ink-mute">
      <div className="text-center">
        <div className="text-5xl mb-4">🏗️</div>
        <h2 className="text-lg font-semibold text-ink mb-2">Community wird eingerichtet</h2>
        <p className="text-sm">Kanäle werden gerade erstellt. Bitte versuche es gleich nochmal.</p>
      </div>
    </div>
  )
}
