"use client";

import { useEffect } from "react";

export function BodyAttributesCleaner() {
  useEffect(() => {
    const cleanup = () => {
      const body = document.body;
      if (body.hasAttribute("cz-shortcut-listen")) {
        body.removeAttribute("cz-shortcut-listen");
      }
    };

    // Run cleanup after hydration
    window.requestAnimationFrame(cleanup);

    return () => {
      window.requestAnimationFrame(cleanup);
    };
  }, []);

  return null;
}
