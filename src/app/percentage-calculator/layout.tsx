import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator — All Percentage Calculations",
  description: "Free percentage calculator. Calculate percentages, percentage increase/decrease, percentage of a number, and more.",
  keywords: ["percentage calculator", "percent calculator", "percentage increase", "percentage decrease", "what percent"],
};

export default function PercentageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
