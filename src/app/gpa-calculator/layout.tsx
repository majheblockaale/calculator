import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPA Calculator — Calculate Your Grade Point Average",
  description: "Free GPA calculator. Calculate your cumulative GPA with support for letter grades, credit hours, and multiple semesters.",
  keywords: ["GPA calculator", "grade point average", "college GPA", "GPA", "grade calculator"],
};

export default function GPALayout({ children }: { children: React.ReactNode }) {
  return children;
}
