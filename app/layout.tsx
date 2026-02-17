import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ScriptKit — Grade Your Scripts",
  description: "Write and grade scripts for TikTok, Reels, and Shorts. Get hook strength, virality scores, and rewrites that actually sound human.",
  openGraph: {
    title: "ScriptKit — Grade Your Scripts",
    description: "Stop writing mid scripts. Grade, fix, ship.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScriptKit — Grade Your Scripts",
    description: "Stop writing mid scripts. Grade, fix, ship.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
