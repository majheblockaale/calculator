import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator — Convert Pay Between Periods",
  description: "Free salary calculator. Convert between hourly, weekly, biweekly, semi-monthly, monthly, quarterly, and annual pay rates instantly.",
  keywords: ["salary calculator", "hourly to salary", "pay converter", "wage calculator", "income converter"],
};

export default function SalaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
