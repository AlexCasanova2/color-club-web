import Link from "next/link";
import { IoArrowBack, IoColorPaletteOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <section className="not-found shell">
      <div className="not-found__number">404</div>
      <IoColorPaletteOutline aria-hidden="true" />
      <h1>Ese color no está aquí.</h1>
      <p>La página puede haber cambiado de sitio o no haber existido nunca.</p>
      <Link className="button button--primary" href="/">
        <IoArrowBack aria-hidden="true" /> Volver al inicio
      </Link>
    </section>
  );
}
