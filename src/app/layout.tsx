import "./global.css";
import { Metadata, Viewport } from "next";
import { Crimson_Pro } from "next/font/google";
import ClientProvider from "./components/ClientProvider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://trymylook.ai";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "TryMyLook AI - AI-Powered Virtual Try-On Platform",
    template: "%s | TryMyLook AI",
  },
  description:
    "Transform your e-commerce with AI-powered virtual try-on technology. Increase sales by 40%, reduce returns by 30%, and double customer engagement.",
  applicationName: "TryMyLook AI",
  keywords: [
    "virtual try-on",
    "AI fashion",
    "e-commerce",
    "fashion tech",
    "retail technology",
    "digital fitting room",
    "virtual fitting room",
    "AI try-on",
    "fashion AI",
    "e-commerce innovation",
    "retail solutions",
    "fashion technology",
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
  },
  category: "Technology",
  verification: {
    google: "your-google-site-verification", // Add your verification code
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
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "TryMyLook AI",
    title: "TryMyLook AI - Transform E-commerce with AI Virtual Try-Ons",
    description:
      "Revolutionize your online fashion retail with AI-powered virtual try-ons. Boost sales by 40%, cut returns by 30%, and enhance customer experience.",
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "TryMyLook AI - Virtual Try-On Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TryMyLook AI - AI Virtual Try-On Platform",
    description:
      "Transform your e-commerce with AI virtual try-ons. 40% more sales, 30% fewer returns, 2x engagement.",
    images: [`${baseUrl}/opengraph-image`],
    creator: "@trymylook",
    site: "@trymylook",
  },
  other: {
    "msapplication-TileColor": "#4F46E5",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
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
      </body>
    </html>
  );
}
