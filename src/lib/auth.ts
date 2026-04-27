import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Resend from "next-auth/providers/resend"
import { db } from "@/lib/db"
import { members } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "Vibetastic <noreply@vibetastic.de>",
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/login/verify",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      const member = await db
        .select()
        .from(members)
        .where(eq(members.email, user.email))
        .limit(1)

      if (member.length === 0 || !member[0].paidAt) {
        return "/login?error=not-a-member"
      }

      return true
    },
    async session({ session, user }) {
      if (user?.id) {
        session.user.id = user.id
      }
      if (session.user?.email) {
        const member = await db
          .select({ role: members.role })
          .from(members)
          .where(eq(members.email, session.user.email))
          .limit(1)

        if (member.length > 0) {
          session.user.role = member[0].role
        }
      }
      return session
    },
  },
})
