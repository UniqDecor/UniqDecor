import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import FloatActions from "@/components/ui/FloatActions";

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
    default: "Premium Furniture & Luxury Decor Showroom in Udaipur | Uniq Decor",
    template: "%s",
  },
  description:
    "Uniq Decor is Udaipur's premier showroom for premium furniture, luxury drapery, and interior decor. Explore global decor brands under one roof. Visit us today.",
  keywords: [
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
    title: "Premium Furniture & Luxury Decor Showroom in Udaipur | Uniq Decor",
    description: "Uniq Decor is Udaipur's premier showroom for premium furniture, luxury drapery, and interior decor.",
    url: "https://uniqdecorfurniture.in/",
    siteName: "Uniq Decor",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-emerald-800 selection:text-white">
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
