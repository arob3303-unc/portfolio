import type { Metadata } from "next";
import { Inter, Wittgenstein } from "next/font/google";
import React from "react";
import "./globals.css";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Wittgenstein({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Austin Robinson — Software Engineer",
  description:
    "Economics and Computer Science student at UNC Chapel Hill. Projects in full-stack web, game development, and algorithmic trading.",
  openGraph: {
    title: "Austin Robinson — Software Engineer",
    description:
      "Economics and Computer Science student at UNC Chapel Hill. Projects in full-stack web, game development, and algorithmic trading.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col bg-ink font-sans text-chalk antialiased">
        <Nav />
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-8 sm:px-6 sm:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
