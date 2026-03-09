import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Step-by-Step Math Solver",
  description: "Free step-by-step math solver. Get detailed solutions for algebra, quadratic equations, linear equations, and arithmetic expressions.",
  keywords: ["math solver", "step by step solver", "algebra solver", "equation solver", "solve math"],
};

export default function SolverLayout({ children }: { children: React.ReactNode }) {
  return children;
}
