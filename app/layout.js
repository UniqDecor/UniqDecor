import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import FloatActions from "@/components/ui/FloatActions";
import AnalyticsTracker from "@/components/ui/AnalyticsTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "Premium Furniture Showroom Udaipur | Uniq Decor Showroom",
    template: "%s",
  },
  description:
    "Uniq Decor is the leading Premium Furniture Showroom Udaipur. Explore premium home furniture, custom drapery, luxury wallpapers, bedding, and roofing sheets.",
  keywords: [
    "Premium Furniture Showroom Udaipur",
    "furniture showroom in Udaipur",
    "premium home decor Udaipur",
    "interior decor Udaipur",
    "luxury furniture showroom Rajasthan",
    "uniq decor Udaipur"
  ],
  metadataBase: new URL("https://uniqdecorfurniture.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Premium Furniture Showroom Udaipur | Uniq Decor Showroom",
    description: "Uniq Decor is the leading Premium Furniture Showroom Udaipur. Explore premium home furniture, custom drapery, luxury wallpapers, bedding, and roofing sheets.",
    url: "https://uniqdecorfurniture.in/",
    siteName: "Uniq Decor",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://uniqdecorfurniture.in/photos/HOMEPAGE%20IMAGE/STONE%20COATED%20ROOFING.jpg",
        width: 1200,
        height: 630,
        alt: "Uniq Decor Premium Furniture Showroom Udaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Furniture Showroom Udaipur | Uniq Decor Showroom",
    description: "Uniq Decor is the leading Premium Furniture Showroom Udaipur. Explore premium home furniture, custom drapery, luxury wallpapers, bedding, and roofing sheets.",
    images: [
      "https://uniqdecorfurniture.in/photos/HOMEPAGE%20IMAGE/STONE%20COATED%20ROOFING.jpg",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-emerald-800 selection:text-white">
        <AnalyticsTracker />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-[#8B4513] focus:text-white focus:text-xs focus:uppercase focus:tracking-widest focus:font-bold focus:rounded-full focus:shadow-lg">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <FloatActions />
      </body>
    </html>
  );
}
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
