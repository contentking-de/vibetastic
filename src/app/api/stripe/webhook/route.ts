import { getStripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { getResend } from "@/lib/resend"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  const stripe = getStripe()
  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    const email = session.customer_details?.email
    if (!email) {
      console.error("No email in checkout session")
      return NextResponse.json({ error: "No email" }, { status: 400 })
    }

    try {
      await db.insert(members).values({
        email,
        stripeSessionId: session.id,
        stripeCustomerId:
          typeof session.customer === "string" ? session.customer : null,
        paidAt: new Date(),
      })

      await getResend().emails.send({
        from: "Vibetastic <noreply@vibetastic.de>",
        to: email,
        subject: "Willkommen bei Vibetastic! Dein Club-Zugang",
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
            <h1 style="color: #2F3430;">Willkommen bei Vibetastic!</h1>
            <p style="color: #5C605C; line-height: 1.6;">
              Deine Buchung war erfolgreich. Du bist jetzt Teil des
              Vibetastic Clubs!
            </p>
            <p style="color: #5C605C; line-height: 1.6;">
              Klicke auf den folgenden Link, um dich einzuloggen und alle
              Workshop-Infos einzusehen:
            </p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/login"
               style="display: inline-block; background: #605E5C; color: #FBF7F3; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px;">
              Zum Club-Bereich
            </a>
            <p style="color: #5C605C; font-size: 14px; margin-top: 24px;">
              Bei Fragen erreichst du uns unter hallo@vibetastic.de
            </p>
          </div>
        `,
      })
    } catch (error) {
      console.error("Error processing webhook:", error)
      return NextResponse.json(
        { error: "Processing failed" },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
