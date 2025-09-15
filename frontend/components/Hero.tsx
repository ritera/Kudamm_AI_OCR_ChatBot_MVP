import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm border-y">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-block rounded-full border px-3 py-1 text-xs tracking-wide text-neutral-600">
              Entdecke Korea!
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Dein Weg nach Korea – hier geht’s los!
            </h1>
            <p className="mt-4 text-neutral-600">
              Studium, Sprachkurs, Au‑Pair, Arbeit oder Reise: Wir begleiten dich von der Idee bis zur Ankunft in Südkorea – klar, zuverlässig und stressfrei.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#services" className="rounded-md bg-brand text-white px-5 py-3 text-sm font-medium hover:opacity-90">
                Angebote ansehen
              </a>
              <Link href="/kontakt" className="rounded-md border px-5 py-3 text-sm font-medium hover:bg-white">
                Kontakt
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* 히어로 이미지 플레이스홀더 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-placeholder.jpg"
              alt="Seoul city view"
              className="w-full rounded-2xl border bg-white shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
