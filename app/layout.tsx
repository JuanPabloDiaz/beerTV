import type { Metadata } from "next";
import { Inter, Bebas_Neue, Teko } from "next/font/google";
import "./globals.css";
import "./layout.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const teko = Teko({
  variable: "--font-teko",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BeerTV - Super Bowl Commercial Experience",
  description:
    "The ultimate collection of iconic beer commercials from the Super Bowl and beyond.",
  keywords: [
    "beer",
    "commercials",
    "super bowl",
    "ads",
    "advertising",
    "television",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${teko.variable} page-background text-white antialiased min-h-screen flex flex-col`}
      >
        <div className="spotlight"></div>
        <Header />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
