import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import SocialSidebar from "@/components/SocialSidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Omusajja wa ODD | Every Odd Wins",
  description: "Uganda's most trusted sports betting tipster. Join the winning team with daily sure odds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <SocialSidebar />
        <main style={{ flex: 1, paddingTop: "80px" }}>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
