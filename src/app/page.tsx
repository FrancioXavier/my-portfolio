"use client";

import { useEffect } from "react";

/**
 * Root redirect page — detects preferred locale via localStorage / navigator.language
 * and forwards the visitor to /en or /pt.
 * Runs client-side only (required for static export with no middleware).
 */
export default function RootRedirect() {
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    const browser =
      (typeof navigator !== "undefined" ? navigator.language : "")?.toLowerCase() ?? "";
    const locale: "en" | "pt" =
      stored === "pt" || stored === "en"
        ? stored
        : browser.startsWith("pt")
          ? "pt"
          : "en";

    window.location.replace(`/${locale}`);
  }, []);

  return (
    <div className="min-h-[100svh] flex items-center justify-center px-6 font-mono text-sm">
      <noscript>
        <div className="text-center">
          <p className="mb-4">Choose a language / Escolha um idioma:</p>
          <ul className="flex gap-4 justify-center list-none p-0">
            <li>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/en">English</a>
            </li>
            <li>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/pt">Português</a>
            </li>
          </ul>
        </div>
      </noscript>
    </div>
  );
}
