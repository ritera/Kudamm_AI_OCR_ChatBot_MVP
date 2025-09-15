import Link from "next/link";

export default function ServiceCard({
  title,
  desc,
  href,
  img
}: {
  title: string;
  desc: string;
  href: string;
  img?: string;
}) {
  return (
    <Link href={href} className="group rounded-xl border bg-white hover:shadow-sm transition overflow-hidden">
      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt={title} className="h-40 w-full object-cover" />
      )}
      <div className="p-5">
        <div className="text-base font-semibold">{title}</div>
        <div className="mt-1 text-sm text-neutral-600">{desc}</div>
        <div className="mt-3 text-sm text-brand">Mehr erfahren →</div>
      </div>
    </Link>
  );
}
