"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type Direction = "up" | "left" | "right" | "scale";

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 24 },
  left: { x: -28 },
  right: { x: 28 },
  scale: { y: 18, scale: 0.98 },
};

export function RevealSection({
  children,
  className,
  labelledBy,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  direction?: Direction;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby={labelledBy}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offsets[direction] }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.24, margin: "-90px" }}
      transition={{ duration: 0.54, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
