import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "@/styles/globals.css"; // Removed: use only one globals.css
import RootLayoutClient from "@/components/RootLayoutClient";
import Providers from "@/components/Providers";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AWQEF Website",
  description: "AWQEF - Empowering Communities Through Sustainable Development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.jpg" type="image/jpeg" />
      </head>
      <body className={inter.className}>
        <Providers>
          <RootLayoutClient fontClass={inter.className}>
            {children}
          </RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
