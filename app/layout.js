import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Instantreels — Cinematic wedding & event films",
  description:
    "Cinematic reels for your special days, crafted with emotion and elegance.",
};

import ScrollProgress from "@/components/ScrollProgress";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-sans bg-linen text-bark antialiased selection:bg-rose-deep selection:text-linen">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
