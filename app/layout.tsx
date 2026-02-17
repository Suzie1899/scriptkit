import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "scriptkit — scripts people actually watch till the end",
  description:
    "Drop your idea, get a script built on what actually works. 9-module script engine, scored on 14 dimensions, anti-AI filter.",
  openGraph: {
    title: "scriptkit — scripts people actually watch till the end",
    description: "Drop your idea, get a script built on what actually works.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${plusJakarta.variable} ${firaCode.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
