import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Calculator — Growth & Returns",
  description: "Free investment calculator. Project investment growth with compound interest, monthly contributions, and see year-by-year returns.",
  keywords: ["investment calculator", "compound interest calculator", "investment growth", "returns calculator", "savings calculator"],
};

export default function InvestmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
