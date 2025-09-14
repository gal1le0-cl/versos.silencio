import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Versos en la Sombra",
  description: "Periódico homenaje al exilio republicano español",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Fuente Basset Seven desde Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/tuj2jic.css" />
      </head>
      <body className={`${inter.variable} font-sans bg-[#121418] text-black`}>
        {children}
      </body>
    </html>
  );
}
