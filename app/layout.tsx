import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

import Providers from "@/providers/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://track-yourhealth.vercel.app"),
  appleWebApp: { capable: true, title: "Health Tracker", statusBarStyle: "default" },
  applicationName: "Health Tracker",
  title: "Health Tracker",
  description: "Track your health metrics",
  creator: "Jesse Juwe",
  publisher: "Vercel",
  openGraph: {
    title: "Health Tracker",
    description: "Track your health metrics",
    url: "https://track-yourhealth.vercel.app",
    siteName: "Health Tracker",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Health Tracker - OpenGraph Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Tracker",
    description: "Track your health metrics",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
