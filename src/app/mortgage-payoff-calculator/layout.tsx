import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Payoff Calculator — Pay Off Your Mortgage Early",
  description: "Free mortgage payoff calculator. See how extra payments can help you pay off your mortgage faster and save on interest.",
  keywords: ["mortgage payoff calculator", "extra payment calculator", "pay off mortgage early", "mortgage acceleration", "early payoff calculator"],
};

export default function MortgagePayoffLayout({ children }: { children: React.ReactNode }) {
  return children;
}
