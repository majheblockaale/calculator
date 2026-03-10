import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lease Calculator — Calculate Monthly Lease Payments",
  description: "Free lease calculator. Estimate monthly lease payments, total lease cost, and interest for car leases and equipment leases.",
  keywords: ["lease calculator", "car lease calculator", "monthly lease payment", "lease cost calculator", "auto lease calculator", "money factor"],
};

export default function LeaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
