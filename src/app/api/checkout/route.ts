import { getStripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/anmeldung`,
      customer_creation: "always",
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Checkout konnte nicht erstellt werden." },
      { status: 500 }
    )
  }
}
