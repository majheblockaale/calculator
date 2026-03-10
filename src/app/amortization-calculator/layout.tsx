import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amortization Calculator — Loan Schedule & Breakdown",
  description: "Free amortization calculator. View full loan amortization schedules, payment breakdowns, and see how extra payments reduce total interest.",
  keywords: ["amortization calculator", "loan schedule", "amortization schedule", "loan breakdown", "extra payment calculator"],
};

export default function AmortizationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
