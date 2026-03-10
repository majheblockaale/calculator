import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Loan Calculator — Car Payment Estimator",
  description: "Free auto loan calculator to estimate monthly car payments, total interest, and total cost including sales tax, down payment, and trade-in value.",
  keywords: ["auto loan calculator", "car payment calculator", "car loan calculator", "vehicle payment estimator", "auto financing calculator"],
};

export default function AutoLoanCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
