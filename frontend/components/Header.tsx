"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Menu } from "lucide-react";

const main = [
  { href: "/", label: "Start" },
  { href: "/kontakt", label: "Kontakt" }
];

const more = [
  { href: "/studium", label: "Studium" },
  { href: "/sprachkurs", label: "Sprachkurs" },
  { href: "/aupair", label: "Au‑Pair" },
  { href: "/arbeit", label: "Arbeit" },
  { href: "/reise", label: "Reise" },
  { href: "/ocr", label: "OCR" } // 편입
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="logo" className="h-6 w-6" />
            <span className="font-semibold">Kudamm Agentur</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {main.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-md px-3 py-2 text-sm font-medium hover:bg-neutral-100",
                  pathname === item.href ? "text-brand" : "text-neutral-600"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setOpenMore(v => !v)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-neutral-100 text-neutral-600"
              >
                Mehr
              </button>
              {openMore && (
                <div
                  onMouseLeave={() => setOpenMore(false)}
                  className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow"
                >
                  {more.map(m => (
                    <Link
                      key={m.href}
                      href={m.href}
                      className={clsx(
                        "block px-4 py-2 text-sm hover:bg-neutral-50",
                        pathname === m.href && "text-brand"
                      )}
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            className="md:hidden rounded-md border p-2"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {open && (
          <div className="md:hidden pb-3">
            {main.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "block rounded-md px-3 py-2 text-sm hover:bg-neutral-100",
                  pathname === item.href ? "text-brand" : "text-neutral-700"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-1">
              <div className="px-3 py-1 text-xs text-neutral-500">Mehr</div>
              {more.map(m => (
                <Link
                  key={m.href}
                  href={m.href}
                  className={clsx(
                    "block rounded-md px-3 py-2 text-sm hover:bg-neutral-100",
                    pathname === m.href ? "text-brand" : "text-neutral-700"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
