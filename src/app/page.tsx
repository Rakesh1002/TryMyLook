import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Script from "next/script";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://trymylook.xyz/#organization",
        name: "TryMyLook AI",
        url: "https://trymylook.xyz",
        logo: {
          "@type": "ImageObject",
          url: "https://trymylook.xyz/android-chrome-512x512.png",
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://twitter.com/trymylook",
          "https://www.linkedin.com/company/trymylook",
          // Add other social media URLs
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://trymylook.xyz/#website",
        url: "https://trymylook.xyz",
        name: "TryMyLook AI",
        publisher: { "@id": "https://trymylook.xyz/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://trymylook.xyz/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
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
        description:
          "AI-powered virtual try-on platform for fashion brands. Transform product photos into professional on-model images instantly.",
        featureList: [
          "Virtual Try-On Technology",
          "AI Model Generation",
          "Real-time Preview",
          "High-quality Image Processing",
        ],
      },
    ],
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
