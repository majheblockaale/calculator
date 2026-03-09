import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptocurrency Converter — Live Crypto Prices",
  description:
    "Free cryptocurrency converter with live prices. Convert Bitcoin, Ethereum, and 50+ cryptocurrencies instantly with real-time rates from CoinGecko.",
  keywords: ["crypto converter", "bitcoin converter", "ethereum converter", "cryptocurrency calculator", "crypto prices"],
};

export default function CryptoConverterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
