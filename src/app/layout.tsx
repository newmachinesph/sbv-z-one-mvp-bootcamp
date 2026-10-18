import type { Metadata } from "next";
import { Manrope, DM_Sans, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@/components/session-provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://z1.sbv.one";
const title = "Z1 Forge | Ship a Live Product in 12 Weeks";
const description =
  "The collaborative forge where teams of 4 build, ship, and launch real products in 12 weeks. AI-assisted development, weekly ship targets, mentor access, and Demo Day. Apply for Cohort 1 at z1.sbv.one.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Z1 Forge",
  },
  description,
  keywords: [
    "startup accelerator",
    "MVP bootcamp",
    "build a startup",
    "ship a product",
    "Z1",
    "SBV",
    "build in public",
    "startup forge",
    "product-led growth",
    "12-week program",
    "team-based accelerator",
    "AI-assisted development",
  ],
  authors: [{ name: "SBV", url: siteUrl }],
  creator: "SBV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Z1 Forge",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Z1 Forge — Ship a Live Product in 12 Weeks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
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
    <html lang="en" className={`${manrope.variable} ${dmSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">

        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
