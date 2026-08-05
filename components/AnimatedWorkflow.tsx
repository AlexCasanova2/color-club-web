"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  IoCameraOutline,
  IoCheckmarkCircle,
  IoColorPaletteOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { gameSteps } from "@/lib/content";

const icons = [IoPeopleOutline, IoColorPaletteOutline, IoCameraOutline, IoCheckmarkCircle] as const;

function StageArtwork({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="stage-art stage-art--club" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <strong>12</strong>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="stage-art stage-art--color" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="stage-art stage-art--collage" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <div className="stage-art stage-art--vote" aria-hidden="true">
      <span />
      <span />
      <strong>+1</strong>
    </div>
  );
}

export function AnimatedWorkflow() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="workflow shell" aria-labelledby="workflow-title">
      <motion.header
        className="section-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
      >
        <p>Un paseo, cuatro momentos</p>
        <h2 id="workflow-title">Del club al ranking.</h2>
      </motion.header>
      <ol className="workflow__steps">
        {gameSteps.map((step, index) => {
          const Icon = icons[index];
          return (
            <motion.li
              key={step.number}
              initial={reduceMotion ? false : { opacity: 0, y: 26, rotate: index % 2 ? -0.7 : 0.7 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.38 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="workflow__number">{step.number}</div>
              <div className="workflow__copy">
                <Icon aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <StageArtwork index={index} />
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
