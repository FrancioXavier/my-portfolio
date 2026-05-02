import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorTrail } from "@/components/effects/CursorTrail";
import "./globals.css";

export const metadata: Metadata = {
  title: "Francio Xavier - Software Engineer",
  description: "Francio Xavier's Portfolio - Software Engineer specializing in scalable architecture and modern web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-accent/30 selection:text-accent-2">
        <CursorTrail />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
