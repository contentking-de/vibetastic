import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/landing/Hero"
import SocialProof from "@/components/landing/SocialProof"
import WhatIsVibeCoding from "@/components/landing/WhatIsVibeCoding"
import WorkshopDetails from "@/components/landing/WorkshopDetails"
import Testimonials from "@/components/landing/Testimonials"
import PricingBlock from "@/components/landing/PricingBlock"
import FAQ from "@/components/landing/FAQ"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <WhatIsVibeCoding />
        <WorkshopDetails />
        <Testimonials />
        <PricingBlock />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
