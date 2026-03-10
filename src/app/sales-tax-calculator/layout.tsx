import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Tax Calculator — Calculate Tax on Purchases",
  description: "Free sales tax calculator. Calculate tax amount, total price with tax, or extract tax from a total. Supports any tax rate.",
  keywords: ["sales tax calculator", "tax calculator", "calculate sales tax", "price with tax", "tax from total", "reverse sales tax"],
};

export default function SalesTaxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
