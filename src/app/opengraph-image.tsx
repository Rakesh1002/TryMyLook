import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TryMyLook AI - Virtual Try-On Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #4F46E5, #9333EA)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "20px",
              lineHeight: 1.1,
            }}
          >
            TryMyLook AI
          </h1>
          <p
            style={{
              fontSize: "40px",
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: "40px",
              maxWidth: "800px",
            }}
          >
            Transform Your E-commerce with AI Virtual Try-Ons
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "24px",
              color: "white",
              opacity: 0.8,
            }}
          >
            <p>40% Higher Conversion</p>
            <p>•</p>
            <p>30% Fewer Returns</p>
            <p>•</p>
            <p>2x Engagement</p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
