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
      await signIn("resend", {
        email,
        callbackUrl,
        redirect: false,
      })
      setSent(true)
    } catch {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-on-primary-fixed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-display text-on-surface mb-4">
          Check deine E-Mails
        </h1>
        <p className="text-on-surface-variant leading-relaxed">
          Wir haben dir einen Magic Link an{" "}
          <strong className="text-on-surface">{email}</strong>{" "}
          geschickt. Klicke auf den Link in der E-Mail, um dich
          einzuloggen.
        </p>
        <button
          onClick={() => { setSent(false); setLoading(false) }}
          className="btn-ghost mt-6"
        >
          Andere E-Mail verwenden
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-10">
        <p className="label-meta mb-4">Club Login</p>
        <h1 className="text-3xl font-bold tracking-display text-on-surface">
          Willkommen zurück
        </h1>
        <p className="mt-3 text-on-surface-variant">
          Gib deine E-Mail ein und wir senden dir einen Login-Link.
        </p>
      </div>

      {error === "not-a-member" && (
        <div className="bg-tertiary-container rounded-lg p-4 mb-6">
          <p className="text-sm text-on-surface">
            <strong>Kein Zugang gefunden.</strong> Diese E-Mail ist
            nicht als Teilnehmer registriert. Hast du den Workshop
            bereits gebucht?
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-on-surface">
          E-Mail-Adresse
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="deine@email.de"
          required
          className="input-field mb-6"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="btn-primary w-full text-center disabled:opacity-60"
        >
          {loading ? "Wird gesendet..." : "Magic Link senden"}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-on-surface-variant/60">
        Du brauchst erst einen Workshop-Zugang?{" "}
        <a href="/anmeldung" className="text-primary underline underline-offset-4">
          Jetzt anmelden
        </a>
      </p>
    </>
  )
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-surface min-h-screen flex items-center">
        <div className="mx-auto max-w-md w-full px-6">
          <Suspense fallback={
            <div className="text-center text-on-surface-variant">Laden...</div>
          }>
            <LoginForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
