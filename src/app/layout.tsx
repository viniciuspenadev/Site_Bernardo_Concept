import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Bernardo Concept | Ambientes Planejados",
  description: "Bernardo Concept - Especialistas em criar ambientes planejados exclusivos e sofisticados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body suppressHydrationWarning className="antialiased mx-auto min-h-screen">
        {children}
      </body>
    </html>
  );
}
