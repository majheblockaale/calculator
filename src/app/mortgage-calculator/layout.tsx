import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator — Monthly Payment & Amortization",
  description: "Free mortgage and loan calculator. Calculate monthly payments, total interest, and view amortization schedules for home loans and mortgages.",
  keywords: ["mortgage calculator", "loan calculator", "home loan calculator", "monthly payment calculator", "amortization calculator"],
};

export default function MortgageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
