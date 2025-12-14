import type { Metadata } from "next";
import { Dosis, Open_Sans, Raleway } from "next/font/google";
import "./globals.css";

// Template fonts configuration
const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kırmızı Vosvos - Official Website",
  description: "Official website of Kırmızı Vosvos music group",
  keywords: ["Kırmızı Vosvos", "music", "band", "Turkish music"],
  authors: [{ name: "Kırmızı Vosvos" }],
  openGraph: {
    title: "Kırmızı Vosvos - Official Website",
    description: "Official website of Kırmızı Vosvos music group",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${dosis.variable} ${openSans.variable} ${raleway.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
