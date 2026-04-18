import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-surface min-h-screen flex items-center">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-8 h-8 text-on-primary-fixed"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-display text-on-surface mb-6">
            Buchung erfolgreich!
          </h1>

          <p className="text-lg text-on-surface-variant leading-relaxed mb-4">
            Willkommen bei Vibetastic! Deine Zahlung wurde bestätigt.
          </p>

          <p className="text-on-surface-variant leading-relaxed mb-10">
            Du erhältst in Kürze eine E-Mail mit deinem persönlichen
            Login-Link zum Vibetastic Club. Dort findest du alle Infos zum
            Workshop, Anreise und Unterkunft.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="btn-primary">
              Zum Club Login
            </Link>
            <Link href="/" className="btn-ghost">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
