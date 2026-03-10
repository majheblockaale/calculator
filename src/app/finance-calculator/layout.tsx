import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance Calculator — Loans, Savings & Investments",
  description: "Free all-in-one finance calculator. Calculate loan payments, savings growth, and investment returns. Solve for any missing variable.",
  keywords: ["finance calculator", "financial calculator", "loan calculator", "savings calculator", "TVM calculator"],
};

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
