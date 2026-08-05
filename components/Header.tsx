import Link from "next/link";
import {
  IoColorPaletteOutline,
  IoHomeOutline,
  IoMapOutline,
  IoOpenOutline,
  IoHelpCircleOutline,
} from "react-icons/io5";
import { Brand } from "./Brand";
import { getDownloadOptions } from "@/lib/site";

const links = [
  { href: "/", label: "Inicio", icon: IoHomeOutline },
  { href: "/como-funciona", label: "Cómo funciona", short: "Cómo", icon: IoMapOutline },
  { href: "/soporte", label: "Soporte", icon: IoHelpCircleOutline },
] as const;

export function Header() {
  const [download] = getDownloadOptions();

  return (
    <>
      <header className="site-header">
        <nav className="desktop-nav" aria-label="Navegación principal">
          <Brand compact />
          <div className="desktop-nav__links">
            {links.slice(1).map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          {download ? (
            <a className="nav-cta" href={download.href} rel="noreferrer">
              Descargar <IoOpenOutline aria-hidden="true" />
            </a>
          ) : (
            <span className="nav-status">
              <IoColorPaletteOutline aria-hidden="true" /> Próximamente
            </span>
          )}
        </nav>
      </header>

      <nav className="mobile-nav" aria-label="Navegación principal móvil">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <Icon aria-hidden="true" />
              <span>{"short" in link ? link.short : link.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
