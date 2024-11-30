import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Script from "next/script";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Getmytry AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "AI-powered virtual try-on solution for e-commerce businesses",
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <LandingPage />
    </>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour
