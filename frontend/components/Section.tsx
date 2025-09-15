import clsx from "clsx";

export default function Section({
  children,
  id,
  className,
  glass = false
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  glass?: boolean;
}) {
  return (
    <section id={id} className={clsx("section", className)}>
      <div className="mx-auto max-w-6xl px-6">
        {glass ? <div className="glass p-6 md:p-8">{children}</div> : children}
      </div>
    </section>
  );
}
