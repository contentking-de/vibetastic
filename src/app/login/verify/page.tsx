import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function VerifyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-surface min-h-screen flex items-center">
        <div className="mx-auto max-w-md w-full px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8 text-on-primary-fixed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-display text-on-surface mb-4">
            Check deine E-Mails
          </h1>
          <p className="text-on-surface-variant leading-relaxed">
            Wir haben dir einen Login-Link per E-Mail geschickt. Klicke
            darauf, um dich einzuloggen.
          </p>
          <p className="mt-4 text-sm text-on-surface-variant/60">
            Keine E-Mail erhalten? Prüfe deinen Spam-Ordner oder{" "}
            <a href="/login" className="text-primary underline underline-offset-4">
              versuche es erneut
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
