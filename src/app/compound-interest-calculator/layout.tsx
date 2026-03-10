import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Calculate Investment Growth",
  description: "Free compound interest calculator. Calculate future value with regular contributions, various compounding frequencies, and see year-by-year growth breakdown.",
  keywords: ["compound interest calculator", "investment calculator", "interest calculator", "savings calculator", "compound growth"],
};

export default function CompoundInterestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
