import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Calculator — Repayment Plan & Interest Cost",
  description: "Free loan calculator to estimate monthly payments, total interest, and view a full amortization schedule for any loan type.",
  keywords: ["loan calculator", "loan repayment calculator", "amortization schedule", "interest calculator", "monthly payment calculator"],
};

export default function LoanCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
