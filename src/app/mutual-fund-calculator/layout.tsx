import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutual Fund Calculator — SIP & Lump Sum Returns",
  description: "Free mutual fund calculator. Calculate future value of SIP and lump sum investments, total returns, and the impact of expense ratios on your portfolio.",
  keywords: ["mutual fund calculator", "SIP calculator", "mutual fund returns", "expense ratio impact", "investment calculator", "SIP investment calculator"],
};

export default function MutualFundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
