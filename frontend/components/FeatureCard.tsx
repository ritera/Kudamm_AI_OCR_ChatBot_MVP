import { ReactNode } from "react";

export default function FeatureCard({
  icon,
  title,
  desc
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border p-5 hover:shadow-sm transition">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white">
        {icon}
      </div>
      <div className="text-base font-semibold">{title}</div>
      <div className="text-sm text-neutral-600 mt-1">{desc}</div>
    </div>
  );
}
