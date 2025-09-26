import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'
import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Versos del Silencio",
  description: "Periódico homenaje al exilio republicano español",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Fuente Basset Seven desde Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/tuj2jic.css" />
                <GoogleAnalytics />

      </head>
      <body className={`${inter.variable} font-sans bg-[#121418] `}>
        {children}
              <GoogleTagManager gtmId="G-3H2LGZQ9NE" />
      </body>
    </html>
  );
}
