import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ARCHIMA — The Soul is Sacrificial",
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
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0f0519] text-[#FAFAFA] antialiased">
        {/* Persistent site chrome */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Footer placeholder (to be implemented later) */}
        <footer className="border-t border-[rgba(115,53,166,0.3)] mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#C4B5FD] tracking-widest uppercase">
              [ ARCHIMA ] — EST. 2025
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
