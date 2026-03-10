"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

type CalcMode = "add-tax" | "extract-tax";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function SalesTaxCalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("add-tax");
  const [price, setPrice] = useState("");
  const [taxRate, setTaxRate] = useState("");

  const results = useMemo(() => {
    const p = parseFloat(price);
    const r = parseFloat(taxRate);
    if (isNaN(p) || p < 0 || isNaN(r) || r < 0) {
      return null;
    }

    if (mode === "add-tax") {
      const taxAmount = p * (r / 100);
      const total = p + taxAmount;
      const effectiveRate = p > 0 ? (taxAmount / p) * 100 : 0;
      return { priceBeforeTax: p, taxAmount, total, effectiveRate };
    } else {
      const priceBeforeTax = p / (1 + r / 100);
      const taxAmount = p - priceBeforeTax;
      const effectiveRate = priceBeforeTax > 0 ? (taxAmount / priceBeforeTax) * 100 : 0;
      return { priceBeforeTax, taxAmount, total: p, effectiveRate };
    }
  }, [price, taxRate, mode]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Sales Tax Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate sales tax, total price, or extract tax from a total.</p>

        <AdBanner slot="sales-tax-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Mode selector */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-2 block">Calculation Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMode("add-tax")}
                    className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                      mode === "add-tax" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Add Tax to Price
                  </button>
                  <button
                    onClick={() => setMode("extract-tax")}
                    className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                      mode === "extract-tax" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Extract Tax from Total
                  </button>
                </div>
              </div>

              {/* Price input */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">
                  {mode === "add-tax" ? "Price Before Tax ($)" : "Total Price Including Tax ($)"}
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Tax rate */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Sales Tax Rate (%)</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Results */}
              {results && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Price Before Tax</span>
                    <span className="text-xl font-bold font-mono">${fmt(results.priceBeforeTax)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Tax Amount</span>
                    <span className="text-xl font-bold font-mono">${fmt(results.taxAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">Total Price</span>
                    <span className="text-2xl font-bold font-mono text-primary">${fmt(results.total)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Effective Tax Rate</span>
                    <span className="text-lg font-bold font-mono">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="sales-tax-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Sales Tax Works</h2>
          <p className="text-muted mb-4">
            Sales tax is a consumption tax charged at the point of sale. The tax amount is calculated
            by multiplying the pre-tax price by the tax rate. For example, with a 7% tax rate on a
            $100 item, the tax is $7.00, making the total $107.00.
          </p>
          <p className="text-muted mb-4">
            To extract tax from a total (reverse calculation), divide the total by (1 + tax rate).
            For example, if a total is $107.00 with a 7% rate, the pre-tax price is
            $107.00 / 1.07 = $100.00, and the tax is $7.00.
          </p>
          <p className="text-muted">
            Sales tax rates vary by state, county, and city in the United States, typically ranging
            from 0% to over 10%. Some states have no sales tax at all, while others have combined
            state and local rates exceeding 10%.
          </p>
        </section>
      </div>
    </div>
  );
}
