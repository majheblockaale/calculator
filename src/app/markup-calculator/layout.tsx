import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markup Calculator — Calculate Price Markup",
  description: "Free markup calculator. Determine selling price from cost and desired markup percentage. Convert between markup and margin instantly.",
  keywords: ["markup calculator", "price markup calculator", "cost plus markup", "markup percentage", "markup to margin converter"],
};

export default function MarkupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
