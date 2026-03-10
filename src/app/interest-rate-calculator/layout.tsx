import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interest Rate Calculator — Find Your Loan's Interest Rate",
  description: "Free interest rate calculator. Determine the annual interest rate on a loan given the loan amount, monthly payment, and loan term using Newton's method.",
  keywords: ["interest rate calculator", "loan rate calculator", "APR calculator", "find interest rate", "loan interest rate"],
};

export default function InterestRateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
