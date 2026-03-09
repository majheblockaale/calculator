import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator — Calculate Your Body Mass Index",
  description: "Free BMI calculator. Calculate your Body Mass Index instantly with height and weight. Supports metric and imperial units with health category information.",
  keywords: ["BMI calculator", "body mass index", "BMI", "health calculator", "weight calculator"],
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return children;
}
