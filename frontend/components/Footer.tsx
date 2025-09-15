import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-700">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src="/favicon.svg" alt="logo" className="h-5 w-5" />
              <span className="font-medium">Kudamm Agentur</span>
            </div>
            <p className="mt-3 text-neutral-600">
              Metapolis-ro 47-25, 543, Hwaseong-si, Gyeonggi-do, Südkorea
            </p>
            <p className="mt-1 text-neutral-600">deutsch_kudamm@naver.com</p>
          </div>
          <div>
            <div className="font-medium">Rechtliches</div>
            <div className="mt-2 space-y-1">
              <Link href="/datenschutz" className="hover:underline">Datenschutz</Link>
              <br />
              <Link href="/agb" className="hover:underline">AGB</Link>
            </div>
          </div>
          <div>
            <div className="font-medium">Hinweis</div>
            <p className="mt-2 text-neutral-600">
              Website-Launch bald verfügbar. Bleiben Sie auf dem Laufenden!
            </p>
          </div>
        </div>
        <div className="mt-8 text-neutral-500">
          © {new Date().getFullYear()} Kudamm Agentur · Launch in Kürze
        </div>
      </div>
    </footer>
  );
}
