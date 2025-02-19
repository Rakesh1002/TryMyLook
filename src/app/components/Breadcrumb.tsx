"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://trymylook.xyz",
      },
      ...paths.map((path, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: path.charAt(0).toUpperCase() + path.slice(1),
        item: `https://trymylook.xyz/${paths.slice(0, index + 1).join("/")}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="flex items-center space-x-2 text-sm text-cool-600">
        <Link href="/" className="hover:text-primary-600">
          <Home className="w-4 h-4" />
        </Link>
        {paths.map((path, index) => (
          <div key={path} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`/${paths.slice(0, index + 1).join("/")}`}
              className="hover:text-primary-600 capitalize"
            >
              {path}
            </Link>
          </div>
        ))}
      </nav>
    </>
  );
}
