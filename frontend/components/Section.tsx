import clsx from "clsx";

export default function Section({
  children,
  id,
  className
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={clsx("section", className)}>
      {children}
    </section>
  );
}
