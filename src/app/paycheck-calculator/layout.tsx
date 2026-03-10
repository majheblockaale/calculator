import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paycheck Calculator — Estimate Your Take-Home Pay",
  description: "Free paycheck calculator. Estimate your take-home pay after federal and state taxes, Social Security, Medicare, and other deductions.",
  keywords: ["paycheck calculator", "take home pay calculator", "salary after taxes", "net pay calculator", "wage calculator"],
};

export default function PaycheckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
