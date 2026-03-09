import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Converter — 150+ Currencies, Live Rates",
  description:
    "Free online currency converter with 150+ world currencies and daily updated exchange rates. Convert USD, EUR, GBP, JPY, and more instantly.",
  keywords: ["currency converter", "exchange rate", "money converter", "forex", "USD to EUR", "currency exchange"],
  openGraph: {
    title: "Currency Converter — Live Rates | CalcOnline",
    description: "Convert between 150+ currencies with live exchange rates.",
  },
};

export default function CurrencyConverterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
