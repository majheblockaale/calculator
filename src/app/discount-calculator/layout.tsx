import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discount Calculator — Calculate Savings & Final Price",
  description: "Free discount calculator. Calculate savings amount, final price after discount, or find the discount percentage between two prices.",
  keywords: ["discount calculator", "percentage off calculator", "sale price calculator", "savings calculator", "price discount calculator"],
};

export default function DiscountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
