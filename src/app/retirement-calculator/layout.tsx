import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Calculator — Plan Your Retirement",
  description: "Free retirement calculator. Project your retirement savings, estimate how long your money will last, and plan your retirement income needs.",
  keywords: ["retirement calculator", "retirement planning", "retirement savings calculator", "retirement income", "how much to retire"],
};

export default function RetirementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
