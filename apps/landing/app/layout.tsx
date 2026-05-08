import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Annotedly — footnoted intelligence for vertical analysts",
  description:
    "A weekly cross-source dossier per vertical (fintech, biotech, govtech, climate-tech, semiconductors). White-labeled for consultancies and partner firms.",
  metadataBase: new URL("https://info-aggregator-reseller.prin7r.com"),
  openGraph: {
    title: "Annotedly — footnoted intelligence for vertical analysts",
    description:
      "Weekly cross-source dossier per vertical. Resellable. Footnoted. Built for analysts who refuse to forward un-cited summaries.",
    url: "https://info-aggregator-reseller.prin7r.com",
    siteName: "Annotedly",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${inter.variable} ${mono.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased">
        <a
          href="#main"
          className="absolute left-2 top-2 -translate-y-20 focus:translate-y-0 z-50 bg-ink text-paper px-3 py-2 text-xs font-mono uppercase tracking-widest"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
