import Link from "next/link"

export default function SoldOutBanner() {
  return (
    <div className="bg-accent text-accent-ink relative overflow-hidden">
      <div className="wrap py-3.5 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-1 text-center">
        <div className="flex items-center gap-2.5 font-mono text-sm font-bold tracking-wide">
          <span className="inline-flex items-center gap-1.5 bg-accent-ink text-accent text-[11px] px-2 py-0.5 rounded-full tracking-label font-bold uppercase">
            Ausverkauft
          </span>
          Workshop #01 — alle 5 Plätze vergeben!
        </div>
        <span className="text-sm opacity-80">
          Folgetermine werden in Kürze bekannt gegeben.{" "}
          <Link href="#signup" className="underline underline-offset-2 font-semibold opacity-100 hover:opacity-80 transition-opacity">
            Auf die Warteliste →
          </Link>
        </span>
      </div>
    </div>
  )
}
