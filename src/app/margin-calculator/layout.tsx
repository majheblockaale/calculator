import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Margin Calculator — Calculate Profit Margin",
  description: "Free margin calculator. Calculate gross margin, net margin, and markup from cost and revenue. Essential for pricing and profitability analysis.",
  keywords: ["margin calculator", "profit margin calculator", "gross margin", "net margin calculator", "markup to margin"],
};

export default function MarginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
