"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ProfitCalculatorPage() {
  const [revenue, setRevenue] = useState("");
  const [costOfGoods, setCostOfGoods] = useState("");
  const [operatingExpenses, setOperatingExpenses] = useState("");
  const [otherExpenses, setOtherExpenses] = useState("");
  const [taxRate, setTaxRate] = useState("25");

  const results = useMemo(() => {
    const rev = parseFloat(revenue);
    const cogs = parseFloat(costOfGoods) || 0;
    const opex = parseFloat(operatingExpenses) || 0;
    const other = parseFloat(otherExpenses) || 0;
    const tax = (parseFloat(taxRate) || 0) / 100;

    if (isNaN(rev) || rev <= 0) return null;

    const grossProfit = rev - cogs;
    const grossMargin = (grossProfit / rev) * 100;
    const operatingProfit = grossProfit - opex;
    const operatingMargin = (operatingProfit / rev) * 100;
    const preTaxProfit = operatingProfit - other;
    const taxes = Math.max(0, preTaxProfit * tax);
    const netProfit = preTaxProfit - taxes;
    const netMargin = (netProfit / rev) * 100;

    return { grossProfit, grossMargin, operatingProfit, operatingMargin, preTaxProfit, taxes, netProfit, netMargin };
  }, [revenue, costOfGoods, operatingExpenses, otherExpenses, taxRate]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Profit Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate gross, operating, and net profit from your business numbers.</p>

        <AdBanner slot="profit-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Revenue ($)</label>
                <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="500,000" />
              </div>
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Cost of Goods Sold ($)</label>
                <input type="number" value={costOfGoods} onChange={(e) => setCostOfGoods(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="200,000" />
              </div>
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Operating Expenses ($)</label>
                <input type="number" value={operatingExpenses} onChange={(e) => setOperatingExpenses(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="100,000" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-muted mb-1 block">Other Expenses ($)</label>
                  <input type="number" value={otherExpenses} onChange={(e) => setOtherExpenses(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary"
                    placeholder="20,000" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Tax Rate (%)</label>
                  <input type="number" step="1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              {results && (
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Net Profit</p>
                    <p className={`text-3xl font-bold font-mono ${results.netProfit >= 0 ? "text-green-400" : "text-red-500"}`}>
                      ${fmt(results.netProfit)}
                    </p>
                    <p className="text-sm text-muted mt-1">Net Margin: {results.netMargin.toFixed(1)}%</p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: "Gross Profit", value: results.grossProfit, extra: `${results.grossMargin.toFixed(1)}% margin` },
                      { label: "Operating Profit", value: results.operatingProfit, extra: `${results.operatingMargin.toFixed(1)}% margin` },
                      { label: "Pre-Tax Profit", value: results.preTaxProfit, extra: "" },
                      { label: "Taxes", value: -results.taxes, extra: "" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center bg-display-bg border border-display-border rounded-lg px-3 py-2">
                        <div>
                          <span className="text-sm text-muted">{item.label}</span>
                          {item.extra && <span className="text-xs text-muted ml-2">({item.extra})</span>}
                        </div>
                        <span className={`font-mono font-bold text-sm ${item.value >= 0 ? "text-green-400" : "text-red-400"}`}>
                          ${fmt(Math.abs(item.value))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="profit-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Understanding Profit Metrics</h2>
          <p className="text-muted mb-4">
            Gross Profit = Revenue - Cost of Goods Sold. This shows how efficiently you produce your product.
            Operating Profit subtracts operating expenses like rent, salaries, and utilities. Net Profit is
            the bottom line after all expenses and taxes.
          </p>
          <p className="text-muted">
            Profit margins (expressed as percentages of revenue) are key metrics for comparing profitability
            across businesses of different sizes and for tracking your business performance over time.
          </p>
        </section>
      </div>
    </div>
  );
}
