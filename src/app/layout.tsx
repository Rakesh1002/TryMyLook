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
};

export const metadata: Metadata = {
  title: {
    default: "TryMyLook AI - Virtual Try-On Platform",
    template: "%s | TryMyLook AI",
  },
  description:
    "Transform your e-commerce with AI-powered virtual try-on technology. Increase sales, reduce returns, and enhance customer experience.",
  keywords: [
    "virtual try-on",
    "AI fashion",
    "e-commerce",
    "fashion tech",
    "retail technology",
    "digital fitting room",
  ],
  authors: [{ name: "TryMyLook AI" }],
  creator: "TryMyLook AI",
  publisher: "TryMyLook AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  robots: {
    index: true,
    follow: true,
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
    url: "https://TryMyLook.ai",
    siteName: "TryMyLook AI",
    title: "TryMyLook AI - Virtual Try-On Platform",
    description:
      "Transform your e-commerce with AI-powered virtual try-on technology",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "TryMyLook AI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TryMyLook AI - Virtual Try-On Platform",
    description:
      "Transform your e-commerce with AI-powered virtual try-on technology",
    images: ["/android-chrome-512x512.png"],
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
