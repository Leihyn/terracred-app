import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TerraCred - Borrow against tokenized real estate on Hedera",
  description:
    "Tokenize your property on Hedera, lock the tokens as collateral, and borrow heNGN Naira stablecoins without selling your home.",
  verification: {
    other: {
      "ory-verify": "PASTE_TERRACRED_TOKEN_HERE",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
