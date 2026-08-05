import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Color Club",
    short_name: "Color Club",
    description: "Retos de color con tus amigos.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f8f5",
    theme_color: "#111217",
    icons: [{ src: "/brand-mark.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
