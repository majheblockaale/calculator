import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inflation Calculator — Calculate Purchasing Power",
  description: "Free inflation calculator. See how inflation affects your purchasing power over time. Compare the value of money across different years.",
  keywords: ["inflation calculator", "purchasing power calculator", "CPI calculator", "cost of living calculator", "inflation rate"],
};

export default function InflationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
