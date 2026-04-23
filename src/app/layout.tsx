import type { Metadata } from "next"
import { Instrument_Serif, Inter, JetBrains_Mono, Fraunces, IBM_Plex_Mono, DM_Sans } from "next/font/google"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vibetastic — Vibecoding Workshop",
  description:
    "Ein zweitägiges Hands-on-Retreat für Menschen ohne Coding-Erfahrung. Du beschreibst — die KI baut.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="de"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} ${ibmPlexMono.variable} ${dmSans.variable}`}
    >
      <body data-theme="warm-ink" data-font="all-mono">
        {children}
      </body>
    </html>
  )
}
