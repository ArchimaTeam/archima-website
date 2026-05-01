import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ARCHIMA",
    template: "%s | ARCHIMA",
  },
  description:
    "Archima is an indie narrative studio creating experiences about desperate survivors in a dissolving world. We make games for players who crave melancholic existentialism.",
  keywords: ["indie game studio", "narrative games", "Levanta", "Tabes Alba", "Archima"],
  openGraph: {
    title: "ARCHIMA — The Soul is Sacrificial",
    description:
      "An indie narrative studio. We make experiences about desperate survivors trying to thrive in a harsh, dissolving world.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0f0519] text-[#FAFAFA] antialiased">
        <Navbar />

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="relative border-t border-[rgba(115,53,166,0.3)] mt-auto overflow-hidden">
          {/* Fade-to-void on the left edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10
                       bg-gradient-to-r from-[#0f0519] to-transparent"
          />
          {/* Fade-to-void on the right edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10
                       bg-gradient-to-l from-[#0f0519] to-transparent"
          />

          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#C4B5FD] tracking-widest uppercase">
              Copyright © 2026 ARCHIMA, All Rights Reserved.
            </span>
            <span className="font-mono text-xs text-[rgba(250,250,250,0.3)] tracking-wide">
              The Soul is Sacrificial.
            </span>
          </div>
        </footer>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


