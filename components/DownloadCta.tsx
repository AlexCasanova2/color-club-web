import Link from "next/link";
import {
  IoLogoApple,
  IoLogoGooglePlaystore,
  IoMailOutline,
  IoArrowForward,
} from "react-icons/io5";
import { getDownloadOptions } from "@/lib/site";

function OptionIcon({ store }: { store: "app-store" | "play-store" | "waitlist" }) {
  if (store === "app-store") return <IoLogoApple aria-hidden="true" />;
  if (store === "play-store") return <IoLogoGooglePlaystore aria-hidden="true" />;
  return <IoMailOutline aria-hidden="true" />;
}

export function DownloadCta({ compact = false }: { compact?: boolean }) {
  const options = getDownloadOptions();

  if (!options.length) {
    return (
      <div className={compact ? "availability availability--compact" : "availability"}>
        <span className="availability__dot" aria-hidden="true" />
        <span>
          <strong>La app estará disponible pronto.</strong>
          {!compact && " Publicaremos aquí los enlaces oficiales."}
        </span>
      </div>
    );
  }

  return (
    <div className="download-options" aria-label="Opciones de descarga">
      {options.map((option, index) => (
        <a
          className={index === 0 ? "button button--primary" : "button button--light"}
          href={option.href}
          key={option.store}
          rel="noreferrer"
        >
          <OptionIcon store={option.store} />
          <span>{option.label}</span>
          <IoArrowForward aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

export function LearnMoreLink() {
  return (
    <Link className="text-link" href="/como-funciona">
      Ver cómo funciona <IoArrowForward aria-hidden="true" />
    </Link>
  );
}
