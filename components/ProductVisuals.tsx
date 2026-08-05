import {
  IoCameraOutline,
  IoCheckmarkCircle,
  IoColorPaletteOutline,
  IoLockClosedOutline,
  IoPeopleOutline,
} from "react-icons/io5";

export function HeroCollage() {
  return (
    <figure className="hero-art" aria-label="Ejemplo ficticio de un reto de color amarillo">
      <div className="hero-art__caption">
        <span>Reto de hoy</span>
        <strong>Amarillo limón</strong>
      </div>
      <div className="collage collage--hero" aria-hidden="true">
        <span className="photo-shape photo-shape--lemon" />
        <span className="photo-shape photo-shape--awning" />
        <span className="photo-shape photo-shape--flower" />
        <span className="photo-shape photo-shape--chair" />
      </div>
      <figcaption>Ejemplo ficticio · 4 de 4 fotos</figcaption>
    </figure>
  );
}

const visualIcons = {
  people: IoPeopleOutline,
  palette: IoColorPaletteOutline,
  camera: IoCameraOutline,
  vote: IoCheckmarkCircle,
} as const;

export function StepVisual({ type, label }: { type: keyof typeof visualIcons; label: string }) {
  const Icon = visualIcons[type];
  return (
    <div className={`step-visual step-visual--${type}`} aria-label={label} role="img">
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function PrivacyDiagram() {
  return (
    <figure className="privacy-diagram">
      <div className="privacy-diagram__club">
        <IoPeopleOutline aria-hidden="true" />
        <strong>Tu club</strong>
        <span>Hasta 12 personas</span>
      </div>
      <div className="privacy-diagram__gate" aria-hidden="true">
        <IoLockClosedOutline />
      </div>
      <div className="privacy-diagram__collage">
        <span /><span /><span /><span />
      </div>
      <figcaption>El collage queda dentro del club y se revela al llegar la votación.</figcaption>
    </figure>
  );
}
