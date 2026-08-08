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
  return (
    <section className="workflow shell" aria-labelledby="workflow-title">
      <header className="section-heading">
        <p>Un paseo, cuatro momentos</p>
        <h2 id="workflow-title">Del club al ranking.</h2>
      </header>
      <ol className="workflow__steps">
        {gameSteps.map((step, index) => {
          const Icon = icons[index];
          return (
            <li key={step.number}>
              <div className="workflow__number">{step.number}</div>
              <div className="workflow__copy">
                <Icon aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <StageArtwork index={index} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
