import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display } from 'next/font/google';
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { AuthProvider } from "../lib/contexts/AuthContext";

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  preload: true,
});

export const metadata: Metadata = {
  title: "Shan Loray - Luxury Beauty & Skincare",
  description: "Discover luxury skincare and beauty products at Shan Loray. Premium formulations for radiant, healthy skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.className}>
      <body>
        <AuthProvider>
          <Navbar/>
           {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}

