"use client"

import { signIn } from "next-auth/react"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const callbackUrl = searchParams.get("callbackUrl") || "/club"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn("resend", {
        email,
        callbackUrl,
        redirect: false,
      })

      if (result?.error || (result?.url && result.url.includes("error="))) {
        window.location.href = "/login?error=not-a-member"
        return
      }

      setSent(true)
    } catch {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="font-display text-[28px] tracking-display text-ink mb-4">
          Check deine E-Mails
        </h1>
        <p className="text-ink-soft leading-relaxed max-w-sm mx-auto">
          Wir haben dir einen Magic Link an{" "}
          <strong className="text-ink">{email}</strong>{" "}
          geschickt. Klicke auf den Link in der E-Mail, um dich einzuloggen.
        </p>
        <button
          onClick={() => { setSent(false); setLoading(false) }}
          className="btn btn-ghost mt-8"
        >
          Andere E-Mail verwenden
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-10">
        <div className="font-mono text-xs text-ink-mute tracking-[0.04em] mb-4">VIBETASTIC CLUB</div>
        <h1 className="font-display text-[32px] tracking-display text-ink">
          Willkommen zurück
        </h1>
        <p className="mt-3 text-ink-soft text-[15px]">
          Gib deine E-Mail ein und wir senden dir einen Login-Link.
        </p>
      </div>

      {error === "not-a-member" && (
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-ink">
            <strong>Kein Zugang gefunden.</strong> Diese E-Mail ist
            nicht als Teilnehmer registriert. Hast du den Workshop
            bereits gebucht?
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-ink">
          E-Mail-Adresse
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="deine@email.de"
          required
          className="w-full px-4 py-3 rounded-xl border border-line bg-bg-card text-ink text-[15px] placeholder:text-ink-mute/50 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all mb-6"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="btn btn-accent w-full justify-center text-[15px] py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Wird gesendet…" : "Magic Link senden →"}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-ink-mute">
        Du brauchst erst einen Workshop-Zugang?{" "}
        <a href="/#signup" className="text-accent underline underline-offset-4 hover:text-ink transition-colors">
          Jetzt bewerben
        </a>
      </p>
    </>
  )
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-bg min-h-screen flex items-center">
        <div className="mx-auto max-w-md w-full px-6">
          <div className="bg-bg-card border border-line rounded-2xl p-8 md:p-10 shadow-lg">
            <Suspense fallback={
              <div className="text-center text-ink-mute">Laden...</div>
            }>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
