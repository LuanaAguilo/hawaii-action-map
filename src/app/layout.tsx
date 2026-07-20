import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import { LanguageProvider } from "@/lib/language";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="en" className={jakarta.variable}>
      <body className="bg-[var(--background)]" suppressHydrationWarning>
        <LanguageProvider>
          <main className="mx-auto min-h-screen w-full max-w-5xl pb-24">
            {children}
          </main>
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}