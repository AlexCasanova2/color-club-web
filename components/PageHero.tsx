import type { ReactNode } from "react";

export function PageHero({
  kicker,
  title,
  children,
  tone = "lavender",
}: {
  kicker: string;
  title: string;
  children: ReactNode;
  tone?: "lavender" | "yellow" | "green" | "blue" | "orange";
}) {
  return (
    <header className={`page-hero page-hero--${tone}`}>
      <div className="shell page-hero__grid">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        <div className="page-hero__copy">{children}</div>
      </div>
    </header>
  );
}
