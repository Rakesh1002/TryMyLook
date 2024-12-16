import "./global.css";
import { Metadata, Viewport } from "next";
import { Crimson_Pro } from "next/font/google";
import ClientProvider from "./components/ClientProvider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crimson",
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4F46E5" },
    { media: "(prefers-color-scheme: dark)", color: "#9333EA" },
  ],
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://trymylook.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "TryMyLook AI - Virtual Try-On & AI Fashion Catalog Generator",
    template: "%s | TryMyLook AI Virtual Try-On",
  },
  description:
    "Convert flatlay images to on-model photos instantly. AI-powered virtual try-on platform for fashion brands. Create professional fashion catalogs, transform product photography, and generate on-model photoshoots without models.",
  applicationName: "TryMyLook AI",
  keywords: [
    "virtual try-on",
    "AI fashion",
    "flatlay to on-model",
    "fashion catalog generator",
    "virtual model photography",
    "AI product photography",
    "digital fashion catalog",
    "on-model photoshoot generator",
    "e-commerce product visualization",
    "AI clothing visualization",
    "virtual fashion photography",
    "automated product photography",
    "fashion tech solution",
    "virtual fitting room",
    "AI model generator",
    "fashion catalog automation",
    "digital product presentation",
    "e-commerce optimization",
    "virtual photoshoot platform",
    "AI fashion technology",
    "reduce product photography costs",
    "scale e-commerce photography",
    "AI fashion technology ROI",
    "virtual model generator",
    "clothing visualization platform",
    "fashion tech automation",
    "product photography automation",
    "e-commerce conversion optimization",
    "fashion catalog software",
    "virtual clothing try-on",
  ],
  authors: [{ name: "TryMyLook AI", url: baseUrl }],
  creator: "TryMyLook AI",
  publisher: "TryMyLook AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
      "x-default": baseUrl,
    },
  },
  category: "Technology",
  verification: {
    google:
      "google-site-verification=W4vWSJ_ktftXRQUiz2FECqLKWBVR4HM9ljZPXaMoi6o", // Add your verification code
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TryMyLook AI",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-touch-icon-precomposed.png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#4F46E5",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    noimageindex: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      notranslate: false,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "TryMyLook AI",
    title: "TryMyLook AI - Convert Flatlay to On-Model Photos Instantly",
    description:
      "Transform product photos into professional on-model images instantly. Create stunning fashion catalogs with AI-powered virtual try-on technology. Perfect for e-commerce brands looking to scale product photography without models.",
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "TryMyLook AI - Virtual Try-On & Fashion Catalog Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TryMyLook AI - Convert Flatlay to On-Model Photos Instantly",
    description:
      "Transform product photos into professional on-model images. Create complete fashion catalogs with AI virtual try-on technology. No models needed.",
    images: [`${baseUrl}/opengraph-image`],
    creator: "@trymylook",
    site: "@trymylook",
  },
  other: {
    "msapplication-TileColor": "#4F46E5",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "pinterest-rich-pin": "true",
    "format-detection": "telephone=no",
    "pinterest-site-verification": "", // Add your Pinterest verification code if available
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "TryMyLook AI",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "150",
      },
    }),
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className={crimson.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        <div className={`antialiased font-crimson`}>
          <SessionProvider session={session}>
            <ClientProvider>{children}</ClientProvider>
          </SessionProvider>
        </div>
        <GoogleAnalytics gaId="G-1TG3455LS8" />
        <Analytics />
      </body>
    </html>
  );
}
