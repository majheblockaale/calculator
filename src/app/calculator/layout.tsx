import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Calculator",
  description:
    "Free online calculator with memory functions, calculation history, and keyboard support. Add, subtract, multiply, divide, and calculate percentages instantly.",
  keywords: ["calculator", "online calculator", "free calculator", "math calculator", "basic calculator"],
  openGraph: {
    title: "Free Online Calculator | CalcOnline",
    description: "Free online calculator with memory functions and calculation history.",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
