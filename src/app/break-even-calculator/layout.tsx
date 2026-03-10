import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Break-Even Calculator — Find Your Break-Even Point",
  description: "Free break-even calculator. Determine the number of units or revenue needed to cover your costs. Analyze fixed costs, variable costs, and pricing.",
  keywords: ["break-even calculator", "break even analysis", "break even point", "business calculator", "cost analysis"],
};

export default function BreakEvenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
