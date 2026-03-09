import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import LocaleProvider from "@/components/LocaleProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const mono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  title: {
    default: "CalcOnline — Free Online Calculator & Unit Converter",
    template: "%s | CalcOnline",
  },
  description:
    "The ultimate free online calculator and converter platform. Scientific calculator, unit converter, currency converter, and more. Calculate and convert anything, anywhere.",
  keywords: [
    "calculator",
    "online calculator",
    "scientific calculator",
    "unit converter",
    "currency converter",
    "math calculator",
    "free calculator",
  ],
  authors: [{ name: "CalcOnline" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CalcOnline",
    title: "CalcOnline — Free Online Calculator & Unit Converter",
    description:
      "The ultimate free online calculator and converter platform. Calculate and convert anything, anywhere.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcOnline — Free Online Calculator & Unit Converter",
    description:
      "The ultimate free online calculator and converter platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <LocaleProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
