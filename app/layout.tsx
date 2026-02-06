import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Caveman's BBQ | EAT. DRINK. REPEAT.",
  description: "The primal BBQ experience. Smoky, bold, and brutal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${inter.variable} antialiased bg-cream text-charcoal overflow-x-hidden`}
      >
        <div className="grain-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.08]" aria-hidden="true" />
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
