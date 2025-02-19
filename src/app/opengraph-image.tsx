import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TryMyLook AI - Virtual Try-On & Fashion Catalog Generator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Load the images using absolute paths
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://trymylook.xyz";

  const beforeImage: string = `${baseUrl}/images/apparel/female/1.jpeg`;
  const afterImage: string = `${baseUrl}/images/apparel/female/1_after_female.png`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f6f8fd, #eef2ff, #f3e8ff)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%)",
            opacity: 0.8,
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
            gap: "24px",
            position: "relative",
            width: "100%",
          }}
        >
          {/* Logo Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                padding: "12px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 6px rgba(99, 102, 241, 0.1)",
              }}
            >
              <svg
                width="32"
                height="32"
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
                color: "#1f2937",
                fontSize: "36px",
                fontWeight: "700",
                lineHeight: "1",
                letterSpacing: "-0.02em",
              }}
            >
              TryMyLook AI
            </div>
          </div>

          {/* Before & After Container */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            {/* Before Image Container */}
            <div
              style={{
                background: "white",
                padding: "8px",
                borderRadius: "16px",
                width: "250px",
                height: "350px",
                position: "relative",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Before Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#4f46e5",
                  color: "white",
                  padding: "4px 16px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  zIndex: 10,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  whiteSpace: "nowrap",
                }}
              >
                Before
              </div>
              <img
                src={beforeImage}
                alt="Flatlay Image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Arrow */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="#4f46e5"
              stroke="#4f46e5"
              strokeWidth="2"
              style={{
                filter: "drop-shadow(0 2px 2px rgba(79, 70, 229, 0.1))",
              }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>

            {/* After Image Container */}
            <div
              style={{
                background: "white",
                padding: "8px",
                borderRadius: "16px",
                width: "250px",
                height: "350px",
                position: "relative",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* After Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#4f46e5",
                  color: "white",
                  padding: "4px 16px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  zIndex: 10,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  whiteSpace: "nowrap",
                }}
              >
                After
              </div>
              <img
                src={afterImage}
                alt="On-Model Image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>

          {/* Main Headline */}
          <p
            style={{
              fontSize: "20px",
              color: "#1f2937",
              maxWidth: "800px",
              lineHeight: 1.2,
              background: "white",
              padding: "16px 32px",
              borderRadius: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "16",
            }}
          >
            Convert Flatlay Apparel Images to On-Model Photos Instantly
          </p>
        </div>

        {/* Bottom Tag */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            background: "white",
            padding: "4px 12px",
            borderRadius: "16px",
            color: "#6366f1",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
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
