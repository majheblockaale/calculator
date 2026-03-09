import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Unit Converter — 18 Categories, 100+ Units",
  description:
    "Free online unit converter. Convert length, weight, temperature, volume, area, speed, time, data, pressure, energy, power, and more across 100+ units.",
  keywords: ["unit converter", "online converter", "metric converter", "length converter", "weight converter", "temperature converter"],
  openGraph: {
    title: "Free Unit Converter | CalcOnline",
    description: "Convert between hundreds of units across 18 categories.",
  },
};

export default function UnitConverterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
