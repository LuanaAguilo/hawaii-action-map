import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Hawaiʻi Action Map",
  description:
    "A free civic action map for Hawaiʻi residents. Report local issues, notify the county, and organize community action.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <Sidebar />
        <main className="ml-64 min-h-screen">{children}</main>
      </body>
    </html>
  );
}