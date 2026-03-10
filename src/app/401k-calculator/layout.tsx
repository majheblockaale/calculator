import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "401K Calculator — Plan Your Retirement Savings",
  description: "Free 401K calculator. Project your retirement savings with employer match, salary growth, and investment returns. Plan your retirement contributions.",
  keywords: ["401k calculator", "retirement calculator", "401k savings", "employer match calculator", "retirement planning"],
};

export default function FourOOneKLayout({ children }: { children: React.ReactNode }) {
  return children;
}
