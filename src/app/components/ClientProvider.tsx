"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Remove unwanted attributes in a microtask to avoid hydration issues
    queueMicrotask(() => {
      const body = document.body;
      if (body.hasAttribute("cz-shortcut-listen")) {
        body.removeAttribute("cz-shortcut-listen");
      }
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}
