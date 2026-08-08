import Link from "next/link";
import { Brand } from "./Brand";
import { DownloadCta } from "./DownloadCta";

const footerLinks = [
  ["Cómo funciona", "/como-funciona"],
  ["Soporte", "/soporte"],
  ["Privacidad", "/privacidad"],
  ["Términos", "/terminos"],
  ["Aviso legal", "/aviso-legal"],
  ["Cookies", "/cookies"],
  ["Normas de la comunidad", "/normas-comunidad"],
  ["Contenido y fotos", "/contenido-y-fotos"],
  ["Eliminar cuenta", "/eliminar-cuenta"],
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p className="site-footer__statement">
          El próximo color puede estar a la vuelta de la esquina.
        </p>
        <DownloadCta compact />
        <div className="site-footer__meta">
          <Brand compact />
          <nav aria-label="Enlaces del pie">
            {footerLinks.map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
          <span>© {new Date().getFullYear()} Color Club</span>
        </div>
      </div>
    </footer>
  );
}
