import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip Calculator — Calculate Tips & Split Bills",
  description: "Free tip calculator. Calculate tip amount, total bill, and split between multiple people. Supports custom tip percentages.",
  keywords: ["tip calculator", "tip calculator online", "bill splitter", "gratuity calculator"],
};

export default function TipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
