import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator — Calculate Your Exact Age",
  description: "Free age calculator. Calculate your exact age in years, months, days, hours, and minutes from your date of birth.",
  keywords: ["age calculator", "how old am I", "birthday calculator", "exact age", "age in days"],
};

export default function AgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
