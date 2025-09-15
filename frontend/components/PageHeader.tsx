export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm border-b">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-2 text-neutral-600">{subtitle}</p>}
      </div>
    </div>
  );
}
