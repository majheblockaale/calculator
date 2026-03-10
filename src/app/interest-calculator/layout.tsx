import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interest Calculator — Simple & Compound Interest",
  description: "Free interest calculator for simple and compound interest. Calculate how much your investment will grow over time with different compounding frequencies.",
  keywords: ["interest calculator", "compound interest calculator", "simple interest calculator", "investment calculator", "savings calculator"],
};

export default function InterestCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
