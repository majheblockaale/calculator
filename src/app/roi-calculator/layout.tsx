import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator — Calculate Return on Investment",
  description: "Free ROI calculator. Calculate total and annualized return on investment, net profit, and compare with savings account returns.",
  keywords: ["ROI calculator", "return on investment calculator", "investment return calculator", "annualized ROI", "investment profit calculator"],
};

export default function ROILayout({ children }: { children: React.ReactNode }) {
  return children;
}
