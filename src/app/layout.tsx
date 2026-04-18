import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vibetastic – Vibe Coding Workshop",
  description:
    "Lerne Vibe Coding in einem exklusiven Workshop. Programmiere mit KI-Unterstützung und erschaffe Projekte, die sich gut anfühlen.",
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
    <html lang="de" className={manrope.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
