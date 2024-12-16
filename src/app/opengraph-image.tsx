import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TryMyLook AI - Virtual Try-On & Fashion Catalog Generator";
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
          background: "linear-gradient(135deg, #4F46E5, #9333EA, #EC4899)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
            opacity: 0.6,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "32px",
            position: "relative",
          }}
        >
          {/* Logo Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(to right, #9333EA, #06b6d4)",
                padding: "16px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
              </svg>
            </div>
            <div
              style={{
                color: "white",
                fontSize: "64px",
                fontWeight: "700",
                lineHeight: "1",
                letterSpacing: "-0.02em",
              }}
            >
              TryMyLook AI
            </div>
          </div>

          {/* Main Headline */}
          <p
            style={{
              fontSize: "36px",
              color: "white",
              maxWidth: "900px",
              lineHeight: 1.2,
              marginBottom: "24px",
              background: "rgba(0, 0, 0, 0.2)",
              padding: "16px 32px",
              borderRadius: "12px",
              fontWeight: "600",
            }}
          >
            Convert Flatlay Apparel Images to On-Model Photos Instantly
          </p>

          {/* Features Container */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "900px",
              gap: "16px",
            }}
          >
            {[
              ["40% Higher", "Conversion Rate"],
              ["30% Fewer", "Returns"],
              ["2x Customer", "Engagement"],
            ].map(([top, bottom]) => (
              <div
                key={top}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "20px",
                  borderRadius: "12px",
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "white",
                    marginBottom: "4px",
                  }}
                >
                  {top}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: "500",
                  }}
                >
                  {bottom}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom Tag */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            background: "rgba(0, 0, 0, 0.2)",
            padding: "4px 8px",
            borderRadius: "20px",
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          trymylook.xyz
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
