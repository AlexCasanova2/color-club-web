import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

export function RevealSection({
  children,
  className,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  direction?: Direction;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={className}
    >
      {children}
    </section>
  );
}
