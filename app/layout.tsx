import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSheet from "@/components/cart/CartSheet";

export const metadata: Metadata = {
  title: {
    default: "Vibrant — Premium Wellness & Beauty",
    template: "%s | Vibrant",
  },
  description:
    "Discover Vibrant's premium range of wellness, skincare, and nutritional supplements — crafted with advanced Liposomal Technology for superior results.",
  keywords: ["vibrant", "wellness", "skincare", "supplements", "natural", "organic"],
  openGraph: {
    title: "Vibrant — Premium Wellness & Beauty",
    description: "Premium wellness and beauty products for a healthier you.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <SmoothScrollProvider>
            <Navbar />
            <CartSheet />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
