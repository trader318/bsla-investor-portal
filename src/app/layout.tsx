import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-fraunces"
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-dm-sans", 
  weight: ["300", "400", "500", "600", "700"] 
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jetbrains-mono", 
  weight: ["400", "500", "600"] 
});

export const metadata: Metadata = {
  title: "BSLA Investment Opportunity | Big Star Land Acquisition",
  description: "Power-ready sites for AI data centers — operational in months, not years. Accredited investors only.",
  keywords: "data center, AI infrastructure, power sites, investment opportunity, accredited investors",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fraunces.variable} ${dmSans.variable} ${jetBrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}