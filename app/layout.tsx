import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { organizationJsonLd, siteConfig, websiteJsonLd } from "@/lib/site";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
});

const bodyFont = Geist({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Color Club · Retos de color con tus amigos",
    template: "%s · Color Club",
  },
  description: siteConfig.description,
  authors: [{ name: "Color Club" }],
  creator: "Color Club",
  publisher: "Color Club",
  category: "game",
  verification: {
    ...(siteConfig.googleSiteVerification ? { google: siteConfig.googleSiteVerification } : {}),
    other: siteConfig.bingSiteVerification
      ? { "msvalidate.01": siteConfig.bingSiteVerification }
      : undefined,
  },
  applicationName: siteConfig.name,
  appleWebApp: {
    title: siteConfig.name,
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: { icon: "/brand-mark.svg", apple: "/brand-mark.svg" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f8f5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <SiteChrome>{children}</SiteChrome>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
