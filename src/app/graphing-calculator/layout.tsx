import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Graphing Calculator",
  description:
    "Free online graphing calculator. Plot multiple equations, zoom, pan, and explore interactive graphs. Supports trigonometric, logarithmic, polynomial, and custom functions.",
  keywords: ["graphing calculator", "online graphing calculator", "plot equations", "graph functions", "math graphs"],
};

export default function GraphingCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
