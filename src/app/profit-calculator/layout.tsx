import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profit Calculator — Calculate Business Profit",
  description: "Free profit calculator. Calculate gross profit, operating profit, and net profit from revenue and expenses. Analyze your business profitability.",
  keywords: ["profit calculator", "gross profit calculator", "net profit calculator", "business profit", "profitability calculator"],
};

export default function ProfitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
