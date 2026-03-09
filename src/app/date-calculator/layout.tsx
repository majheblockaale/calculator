import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Calculator — Days Between Dates & Add/Subtract Days",
  description: "Free date calculator. Calculate the number of days between two dates, add or subtract days from a date, and find future or past dates.",
  keywords: ["date calculator", "days between dates", "date difference", "add days to date", "date counter"],
};

export default function DateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
