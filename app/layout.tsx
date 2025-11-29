import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Sidebar } from "@/app/_components/sidebar";

const inter = Inter({
  display: "auto",
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Stockly",
  description: ""
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-full gap-8">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
