import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "BSLA Investment Opportunity | Big Star Land Acquisition",
  description: "Invest in power-ready data center sites. 30x proven returns, 6-12 month delivery vs 4-7 years traditional. Accredited investors only.",
  keywords: ["data center", "investment", "accredited investors", "power infrastructure", "AI infrastructure"],
  authors: [{ name: "Big Star Land Acquisition" }],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "BSLA Investment Opportunity",
    description: "Invest in the Infrastructure Powering AI's Future",
    type: "website",
    url: "https://portal.bigstarblockchain.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} ${dmMono.variable} font-primary text-text-primary bg-primary-dark antialiased`}>
        {children}
      </body>
    </html>
  );
}