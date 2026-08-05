import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Color Club, inicio">
      <Image
        src="/brand-mark.svg"
        alt=""
        width={compact ? 32 : 38}
        height={compact ? 32 : 38}
        priority
      />
      <span>Color Club</span>
    </Link>
  );
}
