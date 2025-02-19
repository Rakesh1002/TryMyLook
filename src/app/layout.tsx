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
    // Brand Keywords
    "TryMyLook",
    "TryMyLook AI",
    "Try My Look",
    "virtual try on solution",
    "AI fashion platform",

    // Core Product Keywords
    "virtual try-on",
    "AI fashion",
    "flatlay to on-model",
    "apparel to model",
    "on model photography",
    "apparel photography",
    "clothing photography",
    "product photography",
    "clothing visualization software",
    "virtual dress up",
    "virtual clothing preview",
    "digital garment fitting",
    "virtual garment try on",
    "3D clothing visualization",

    // Industry Terms
    "e-commerce photography",
    "fashion photography",
    "catalog photography",
    "clothing visualization",
    "garment photography",
    "fashion product photos",
    "fashion tech",
    "digital fashion",
    "fashion innovation",
    "fashion technology solution",
    "fashion retail tech",
    "fashion digital transformation",
    "fashion AI solution",

    // Problem-Solution Keywords
    "reduce photography costs",
    "automate product photos",
    "scale product photography",
    "no model needed",
    "photoshoot alternative",
    "model-free photography",
    "reduce product returns",
    "increase online sales",
    "improve conversion rates",
    "save photography budget",
    "eliminate model hiring",
    "streamline product photography",
    "automate fashion catalog",
    "reduce time to market",

    // Technology Keywords
    "AI fashion",
    "fashion catalog generator",
    "virtual model photography",
    "AI product photography",
    "digital fashion catalog",
    "artificial intelligence fashion",
    "AI powered photography",
    "virtual model generator",
    "on-model photoshoot generator",
    "e-commerce product visualization",
    "AI clothing visualization",
    "virtual fashion photography",
    "automated product photography",
    "fashion tech solution",
    "computer vision fashion",
    "AI image generation",
    "deep learning fashion",
    "machine learning clothing",
    "generative AI fashion",
    "neural network clothing",
    "AI powered visualization",

    // Business Benefits
    "increase conversion rate",
    "reduce returns",
    "improve product presentation",
    "cost effective photography",
    "fast product photography",
    "efficient catalog creation",
    "ROI optimization",
    "operational efficiency",
    "photography cost reduction",
    "faster product launches",
    "scalable product imaging",
    "sustainable fashion tech",
    "digital transformation ROI",

    // E-commerce Terms
    "e-commerce optimization",
    "online store photos",
    "product listing images",
    "marketplace photography",
    "fashion e-commerce",
    "retail photography",
    "virtual fitting room",
    "AI model generator",
    "fashion catalog automation",
    "digital product presentation",
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
    "fashion marketplace solution",
    "e-commerce conversion",
    "online retail optimization",
    "digital shopping experience",
    "virtual shopping solution",
    "e-commerce visualization",
    "online fashion retail",

    // Target Audience Keywords
    "fashion brands",
    "clothing retailers",
    "fashion e-commerce brands",
    "online fashion stores",
    "fashion marketplaces",
    "apparel manufacturers",
    "fashion startups",
    "clothing wholesalers",
    "fashion dropshippers",

    // Use Case Keywords
    "product listing optimization",
    "fashion catalog creation",
    "product visualization",
    "virtual fitting solution",
    "size visualization",
    "fit prediction",
    "product presentation",
    "visual merchandising",

    // Integration Keywords
    "e-commerce platform integration",
    "Shopify compatible",
    "WooCommerce solution",
    "marketplace integration",
    "API integration",
    "headless commerce",
    "multi-platform solution",

    // Geographic/Market Keywords
    "global fashion tech",
    "international e-commerce",
    "worldwide retail solution",
    "cross-border fashion",
    "global fashion retail",
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
    images: [{
      url: '/opengraph-image.jpg',
      width: 1200,
      height: 630,
      alt: 'TryMyLook AI - Convert Flatlay Apparel Images to On-Model Photos Instantly'
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TryMyLook AI - Convert Flatlay to On-Model Photos Instantly",
    description:
      "Transform product photos into professional on-model images. Create complete fashion catalogs with AI virtual try-on technology. No models needed.",
    images: ['/opengraph-image.jpg'],
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
