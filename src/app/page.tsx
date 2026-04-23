"use client"

import { useScrollReveal } from "@/hooks/useScrollReveal"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/landing/Hero"
import WhatIsVibeCoding from "@/components/landing/WhatIsVibeCoding"
import Agenda from "@/components/landing/Agenda"
import Schedule from "@/components/landing/Schedule"
import LiveDemo from "@/components/landing/LiveDemo"
import Tools from "@/components/landing/Tools"
import Host from "@/components/landing/Host"
import Testimonials from "@/components/landing/Testimonials"
import Chat from "@/components/landing/Chat"
import PricingBlock from "@/components/landing/PricingBlock"
import FAQ from "@/components/landing/FAQ"
import Signup from "@/components/landing/Signup"

function ScrollRevealInit() {
  useScrollReveal()
  return null
}

export default function Home() {
  return (
    <>
      <ScrollRevealInit />
      <Header />
      <main>
        <Hero />
        <WhatIsVibeCoding />
        <Agenda />
        <Schedule />
        <LiveDemo />
        <Tools />
        <Host />
        <Testimonials />
        <Chat />
        <PricingBlock />
        <FAQ />
        <Signup />
      </main>
      <Footer />
    </>
  )
}
