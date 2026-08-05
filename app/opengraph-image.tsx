import { ImageResponse } from "next/og";

export const alt = "Color Club · Retos de color con tus amigos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "72px",
        background: "#f8f8f5",
        color: "#111217",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "70%" }}>
        <span style={{ fontSize: 26, fontWeight: 700 }}>COLOR CLUB</span>
        <span style={{ fontSize: 76, lineHeight: 1, fontWeight: 800 }}>
          Sal a buscar tu color.
        </span>
        <span style={{ fontSize: 28 }}>Retos de color con tus amigos.</span>
      </div>
      <div
        style={{
          width: 250,
          height: 250,
          borderRadius: 125,
          border: "52px solid #111217",
          background: "#ffc455",
          boxShadow: "58px -58px 0 #ac98ff, -58px 58px 0 #62c79b",
        }}
      />
    </div>,
    size,
  );
}
