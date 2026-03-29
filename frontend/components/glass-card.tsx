import { ReactNode } from "react";

export function GlassCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass rounded-2xl p-5 shadow-glow ${className}`}>
      {title ? <h3 className="card-title">{title}</h3> : null}
      {subtitle ? <p className="mt-1 text-sm text-slate-300/80">{subtitle}</p> : null}
      <div className={title || subtitle ? "mt-4" : ""}>{children}</div>
    </section>
  );
}
