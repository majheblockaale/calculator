import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Scientific Calculator Online",
  description:
    "Free online scientific calculator with trigonometry, logarithms, exponents, factorials, and constants. Supports radian and degree modes.",
  keywords: ["scientific calculator", "online scientific calculator", "trig calculator", "math calculator"],
  openGraph: {
    title: "Free Scientific Calculator Online | CalcOnline",
    description: "Free scientific calculator with trig, log, and more.",
  },
};

export default function ScientificCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
