import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Calculator — Estimate Your 2024 Federal Taxes",
  description: "Free income tax calculator. Estimate your 2024 US federal income tax based on filing status, income, and deductions. See effective tax rate, marginal rate, and bracket breakdown.",
  keywords: ["income tax calculator", "federal tax calculator", "tax bracket calculator", "tax estimator", "2024 tax calculator"],
};

export default function IncomeTaxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
