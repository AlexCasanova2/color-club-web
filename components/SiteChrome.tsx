"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/internal-admin");

  if (isAdmin) return <main id="contenido">{children}</main>;

  return (
    <>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
    </>
  );
}
