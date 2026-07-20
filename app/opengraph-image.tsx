import { ImageResponse } from "next/og";

export const alt =
  "Aden Eats — Home-cooked Habesha food, made by your neighbors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stripe =
  "repeating-linear-gradient(90deg, #1d9e75 0 40px, #e2a93b 40px 60px, #1d9e75 60px 80px, #c43b1e 80px 100px)";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#231812",
        }}
      >
        <div style={{ display: "flex", height: 28, width: "100%", background: stripe }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#e2a93b",
              marginBottom: 24,
            }}
          >
            Serving the DMV
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              color: "#f5ebdc",
              lineHeight: 1.05,
            }}
          >
            Aden
            <span style={{ color: "#1d9e75", marginLeft: 22 }}>Eats</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#cbb8a4",
              marginTop: 28,
              textAlign: "center",
            }}
          >
            Home-cooked Habesha food, made by your neighbors.
          </div>
        </div>
        <div style={{ display: "flex", height: 28, width: "100%", background: stripe }} />
      </div>
    ),
    { ...size },
  );
}
