import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Calculator — Calculate Monthly Payments",
  description: "Free payment calculator. Determine monthly payments for any loan amount, interest rate, and term. Compare different loan scenarios.",
  keywords: ["payment calculator", "monthly payment calculator", "loan payment calculator", "installment calculator", "EMI calculator"],
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
