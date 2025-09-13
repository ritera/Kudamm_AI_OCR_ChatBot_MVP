import Link from "next/link";

export default function CTA({
  title,
  subtitle,
  ctaText,
  href
}: {
  title: string;
  subtitle?: string;
  ctaText: string;
  href: string;
}) {
  return (
    <section className="section bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
        {subtitle && <p className="text-neutral-600 mt-3">{subtitle}</p>}
        <div className="mt-6">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-md bg-brand text-white px-5 py-3 text-sm font-medium hover:opacity-90 transition"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
