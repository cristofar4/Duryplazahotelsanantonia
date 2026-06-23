import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import { HOTEL } from "@/lib/data";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://drury-plaza-riverwalk.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${HOTEL.fullName} — A 1929 Landmark on the Water's Edge`,
    template: `%s · ${HOTEL.name} ${HOTEL.location}`,
  },
  description:
    "Stay inside a restored 1929 landmark on the San Antonio River Walk. Rooftop pool, complimentary hot breakfast, the nightly 5:30 Kickback, and refined rooms steps from the Alamo.",
  keywords: [
    "Drury Plaza Hotel San Antonio Riverwalk",
    "luxury hotel San Antonio",
    "River Walk hotel",
    "Alamo National Bank Building",
    "downtown San Antonio hotel",
  ],
  authors: [{ name: HOTEL.fullName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: HOTEL.fullName,
    title: `${HOTEL.fullName} — A 1929 Landmark on the Water's Edge`,
    description:
      "A restored 1929 landmark on the San Antonio River Walk. Rooftop pool, complimentary breakfast, and refined rooms steps from the Alamo.",
  },
  twitter: {
    card: "summary_large_image",
    title: HOTEL.fullName,
    description: "A 1929 landmark, reimagined on the water's edge.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0A08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Preloader />
        <div className="grain" aria-hidden />
        <SmoothScroll>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
