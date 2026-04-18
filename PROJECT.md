# Vibetastic – Projektplan für Cursor

## Projektübersicht

**Projektname:** Vibetastic  
**Domain:** vibetastic.de  
**Ziel:** Workshop-Anmeldungen generieren + exklusiver Mitgliederbereich für zahlende Teilnehmer  
**Tech-Stack:** Next.js, Tailwind CSS, Supabase, Stripe, Resend

---

## Architektur

### Zwei Bereiche

1. **Öffentliche Landing Page** (`/`) – für alle Besucher sichtbar
2. **Club-Bereich** (`/club`) – nur für Teilnehmer nach Stripe-Zahlung zugänglich

### Datenfluss

```
Besucher → Landing Page → Stripe Checkout → Webhook → Supabase (User aktivieren) → Magic Link E-Mail → /club
```

---

## Tech-Stack

| Tool | Zweck |
|------|-------|
| Next.js 14 (App Router) | Framework, Routing, API Routes |
| Tailwind CSS | Styling |
| Supabase | Datenbank (PostgreSQL) + Auth (Magic Link) |
| Stripe | Zahlungsabwicklung + Webhooks |
| Resend | Transaktionale E-Mails (Magic Link Versand) |
| Vercel | Hosting & Deployment |

---

## Projektstruktur

```
vibetastic/
├── app/
│   ├── page.tsx                  # Landing Page (öffentlich)
│   ├── anmeldung/
│   │   └── page.tsx              # Anmeldeseite mit Preisanzeige + Stripe CTA
│   ├── success/
│   │   └── page.tsx              # Bestätigungsseite nach Zahlung
│   ├── club/
│   │   ├── page.tsx              # Club-Dashboard (geschützt)
│   │   ├── workshop/
│   │   │   └── page.tsx          # Workshop-Infos & Agenda
│   │   ├── unterkunft/
│   │   │   └── page.tsx          # Unterkunftsempfehlungen
│   │   └── anreise/
│   │       └── page.tsx          # Anreiseinformationen
│   ├── login/
│   │   └── page.tsx              # Magic Link Login
│   └── api/
│       ├── stripe/
│       │   └── webhook/
│       │       └── route.ts      # Stripe Webhook Handler
│       ├── checkout/
│       │   └── route.ts          # Stripe Checkout Session erstellen
│       └── auth/
│           └── magic-link/
│               └── route.ts      # Magic Link versenden
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   ├── WhatIsVibeCoding.tsx
│   │   ├── WorkshopDetails.tsx
│   │   ├── Testimonials.tsx
│   │   ├── PricingBlock.tsx
│   │   └── FAQ.tsx
│   └── club/
│       ├── ClubNav.tsx
│       └── ProtectedRoute.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase Client (Browser)
│   │   └── server.ts             # Supabase Client (Server)
│   ├── stripe.ts                 # Stripe Initialisierung
│   └── resend.ts                 # Resend Initialisierung
├── middleware.ts                  # Auth-Schutz für /club
└── .env.local                    # Umgebungsvariablen
```

---

## Umgebungsvariablen (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_BASE_URL=https://vibetastic.de
```

---

## Supabase Datenbankschema

```sql
-- Tabelle: members
create table members (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  stripe_session_id text,
  stripe_customer_id text,
  paid_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Row Level Security aktivieren
alter table members enable row level security;

-- Policy: Nutzer sieht nur eigene Daten
create policy "Own data only" on members
  for select using (auth.email() = email);
```

---

## Implementierung – Schritt für Schritt

### Schritt 1: Projekt initialisieren

```bash
npx create-next-app@latest vibetastic --typescript --tailwind --app
cd vibetastic
npm install @supabase/supabase-js @supabase/ssr stripe resend
```

### Schritt 2: Landing Page (`app/page.tsx`)

Sektionen in dieser Reihenfolge von oben nach unten:

1. **Hero** – Headline, kurze Beschreibung, CTA-Button „Jetzt anmelden" → verlinkt zu `/anmeldung`
2. **Social Proof** – Screenshots/Posts aus Social Media, Follower-Zahlen
3. **Was ist Vibe Coding?** – Kurze Erklärung in 2–3 Schritten
4. **Workshop-Details** – Datum, Ort, Format, Ablauf-Vorschau
5. **Testimonials** – Stimmen aus der Community
6. **Preisblock** – Preis klar anzeigen, CTA-Button zu Stripe
7. **FAQ** – 5–8 häufige Fragen
8. **Footer** – Impressum, Datenschutz, Social Links

### Schritt 3: Anmeldeseite (`app/anmeldung/page.tsx`)

- Preis prominent anzeigen (z.B. „297 €")
- Was ist im Preis enthalten (Bullet-Liste)
- Button „Jetzt buchen" → ruft `POST /api/checkout` auf
- Stripe Checkout Session wird serverseitig erstellt und Nutzer wird zu Stripe weitergeleitet

### Schritt 4: Stripe Checkout API (`app/api/checkout/route.ts`)

```typescript
// POST /api/checkout
// Erstellt eine Stripe Checkout Session und gibt die URL zurück

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/anmeldung`,
  })
  return Response.json({ url: session.url })
}
```

### Schritt 5: Stripe Webhook (`app/api/stripe/webhook/route.ts`)

- Event: `checkout.session.completed`
- E-Mail aus Session auslesen
- Nutzer in Supabase `members`-Tabelle speichern (E-Mail + Stripe-IDs + paid_at)
- Magic Link E-Mail über Resend versenden

```typescript
// Wichtig: Raw Body für Stripe Signatur-Verifikation
export const config = { api: { bodyParser: false } }

// Ablauf:
// 1. Stripe Signatur verifizieren
// 2. Bei "checkout.session.completed":
//    a. E-Mail aus session.customer_details.email
//    b. Supabase: INSERT INTO members (email, stripe_session_id, paid_at)
//    c. Resend: Magic Link E-Mail senden
```

### Schritt 6: Magic Link Login

**Flow:**
1. Nutzer öffnet `/login`
2. Gibt E-Mail ein
3. API prüft: Ist die E-Mail in der `members`-Tabelle?
4. Falls ja: Supabase Auth sendet Magic Link
5. Nutzer klickt Link → wird zu `/club` weitergeleitet

```typescript
// app/api/auth/magic-link/route.ts
// 1. E-Mail in members-Tabelle prüfen (Service Role Key)
// 2. Falls vorhanden: supabase.auth.admin.generateLink({ type: 'magiclink', email })
// 3. Link per Resend versenden
// 4. Falls nicht vorhanden: Fehlermeldung "Keine Anmeldung gefunden"
```

### Schritt 7: Middleware – Club-Schutz (`middleware.ts`)

```typescript
// Schützt alle Routen unter /club
// Prüft Supabase Session
// Kein gültiger User → Redirect zu /login

import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/club/:path*']
}
```

### Schritt 8: Club-Bereich (`app/club/`)

**`/club` – Dashboard:**
- Willkommensnachricht mit Name/E-Mail
- Übersicht aller Club-Bereiche als Karten
- Nächste Schritte / Checkliste für Teilnehmer

**`/club/workshop` – Workshop-Infos:**
- Vollständige Agenda
- Downloadbare Materialien (PDF-Links)
- Vorbereitungsaufgaben

**`/club/unterkunft` – Unterkunft:**
- 3–5 empfohlene Hotels/Unterkünfte in der Nähe
- Name, Entfernung, Link zur Buchung

**`/club/anreise` – Anreise:**
- Adresse des Workshop-Ortes
- Anreise per Bahn (nächster Bahnhof, Verbindungshinweise)
- Anreise per Auto (Parkplatzsituation)
- Optional: Eingebettete Google Maps Karte

---

## Wichtige Hinweise

### DSGVO (Pflicht für .de)
- Impressum auf der Landing Page verlinken
- Datenschutzerklärung erstellen (eRecht24 Generator empfohlen)
- Stripe als Auftragsverarbeiter in der Datenschutzerklärung nennen
- Supabase-Daten in EU-Region hosten (Frankfurt)
- Cookie-Banner nur wenn nötig (keine Tracking-Cookies = kein Banner nötig)

### Stripe-Konto Setup
1. Stripe-Konto erstellen und verifizieren (Personalausweis + Bankdaten)
2. Produkt anlegen: Name „Vibetastic Workshop", Preis festlegen
3. Webhook-Endpunkt registrieren: `https://vibetastic.de/api/stripe/webhook`
4. Events auswählen: `checkout.session.completed`
5. Webhook Secret kopieren → in `.env.local`

### Supabase Setup
1. Neues Projekt erstellen (Region: Frankfurt)
2. SQL-Schema ausführen (siehe oben)
3. Auth → E-Mail-Provider aktivieren
4. Magic Link E-Mail-Template anpassen (Branding)

### Deployment (Vercel)
1. GitHub-Repo mit Vercel verbinden
2. Alle Umgebungsvariablen in Vercel eintragen
3. Domain vibetastic.de in Vercel hinterlegen
4. Stripe Webhook URL auf Produktions-URL aktualisieren

---

## Launch-Checkliste

- [ ] Domain vibetastic.de registriert und auf Vercel zeigend
- [ ] Stripe-Konto verifiziert, Produkt + Preis angelegt
- [ ] Supabase-Projekt in Frankfurt, Schema deployed
- [ ] Resend-Konto eingerichtet, Domain verifiziert
- [ ] Alle Umgebungsvariablen in Vercel gesetzt
- [ ] End-to-End-Test: Zahlung → Webhook → Magic Link → Club-Zugang
- [ ] Landing Page Texte eingepflegt (Headline, Workshop-Details, FAQ)
- [ ] Club-Bereich Inhalte eingepflegt (Agenda, Unterkunft, Anreise)
- [ ] Impressum + Datenschutzerklärung vorhanden
- [ ] Mobile-Ansicht getestet
- [ ] Stripe im Live-Modus aktiviert (nicht mehr Test-Modus)
