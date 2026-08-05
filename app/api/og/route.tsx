import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

function clean(value: string | null, fallback: string, maxLength: number) {
  return (value || fallback).replace(/[<>]/g, "").slice(0, maxLength);
}

export function GET(request: NextRequest) {
  const title = clean(request.nextUrl.searchParams.get("title"), "Color Club", 80);
  const description = clean(
    request.nextUrl.searchParams.get("description"),
    "Retos de color con tus amigos.",
    180,
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
        padding: "68px",
        background: "#f8f8f5",
        color: "#111217",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", width: "69%", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 25, fontWeight: 800 }}>
          <span
            style={{
              display: "flex",
              width: 46,
              height: 46,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              background: "#111217",
              color: "#ffc455",
            }}
          >
            C
          </span>
          COLOR CLUB
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <span style={{ fontSize: title.length > 48 ? 58 : 72, lineHeight: 0.98, fontWeight: 850, letterSpacing: "-3px" }}>
            {title}
          </span>
          <span style={{ maxWidth: "700px", fontSize: 25, lineHeight: 1.3, color: "#5f605b" }}>
            {description}
          </span>
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", width: "27%", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", width: 230, height: 230, borderRadius: 115, background: "#ac98ff" }} />
        <div style={{ position: "absolute", width: 170, height: 170, borderRadius: 85, background: "#ffc455" }} />
        <div style={{ position: "absolute", width: 105, height: 105, borderRadius: 53, background: "#62c79b" }} />
        <div style={{ position: "absolute", width: 42, height: 42, borderRadius: 21, background: "#111217" }} />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
    },
  );
}
