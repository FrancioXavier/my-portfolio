import type { ReactNode } from "react";
import "./globals.css";

/**
 * Root shell layout — intentionally minimal.
 * All chrome (Navbar, Footer, html lang) is handled by [locale]/layout.tsx.
 * The (redirect) route group provides its own html/body for the root redirect page.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
