import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import CookieBanner from './components/CookieBanner'

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
        <meta name="msvalidate.01" content="CA6E43159E15DF77E781EE98ADD442BD" />
        <script defer src="https://analytics.clogy.net/recorder.js" data-website-id="630e0369-2f2a-4655-b01b-01739e3d79f4"></script>
      </head>
      <body className={`${inter.variable} font-sans bg-[#121418] `}>
        {children}
        <GoogleAnalytics gaId="G-3H2LGZQ9NE" />
        

        {/* Umami Analytics */}
        <Script
          src="https://analytics.clogy.net/script.js"
          data-website-id="630e0369-2f2a-4655-b01b-01739e3d79f4"
          strategy="afterInteractive"
        />
        <CookieBanner />
      </body>
    </html>
  );
}