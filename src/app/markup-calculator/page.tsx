"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function MarkupCalculatorPage() {
  const [cost, setCost] = useState("");
  const [markupPct, setMarkupPct] = useState("");

  const results = useMemo(() => {
    const c = parseFloat(cost);
    const m = parseFloat(markupPct);
    if (isNaN(c) || c <= 0 || isNaN(m) || m < 0) return null;

    const markupAmount = c * (m / 100);
    const sellingPrice = c + markupAmount;
    const profitMargin = (markupAmount / sellingPrice) * 100;

    const commonMarkups = [10, 25, 50, 75, 100, 150, 200].map((pct) => {
      const sp = c * (1 + pct / 100);
      const margin = (pct / (100 + pct)) * 100;
      return { markup: pct, sellingPrice: sp, profit: sp - c, margin };
    });

    return { markupAmount, sellingPrice, profitMargin, commonMarkups };
  }, [cost, markupPct]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Markup Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate selling price and profit from cost and markup percentage.</p>

        <AdBanner slot="markup-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Cost ($)</label>
                <input type="number" value={cost} onChange={(e) => setCost(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="50" step="0.01" />
              </div>
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Markup (%)</label>
                <input type="number" value={markupPct} onChange={(e) => setMarkupPct(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="100" step="1" />
              </div>

              {results && (
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Selling Price</p>
                    <p className="text-3xl font-bold font-mono text-primary">${fmt(results.sellingPrice)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Profit</p>
                      <p className="font-bold font-mono text-green-400">${fmt(results.markupAmount)}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Profit Margin</p>
                      <p className="font-bold font-mono">{results.profitMargin.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Markup Reference Table</h3>
                <div className="bg-display-bg border border-display-border rounded-xl overflow-hidden">
                  <table className="w-full text-sm font-mono">
                    <thead>
                      <tr className="border-b border-display-border text-muted">
                        <th className="text-left px-3 py-2">Markup</th>
                        <th className="text-right px-3 py-2">Price</th>
                        <th className="text-right px-3 py-2">Profit</th>
                        <th className="text-right px-3 py-2">Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.commonMarkups.map((row) => (
                        <tr key={row.markup} className="border-b border-display-border last:border-0">
                          <td className="px-3 py-2">{row.markup}%</td>
                          <td className="text-right px-3 py-2">${fmt(row.sellingPrice)}</td>
                          <td className="text-right px-3 py-2 text-green-400">${fmt(row.profit)}</td>
                          <td className="text-right px-3 py-2">{row.margin.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <AdBanner slot="markup-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Markup Works</h2>
          <p className="text-muted">
            Markup is the percentage added to the cost of a product to determine its selling price.
            A 100% markup means you double the cost. The formula is: Selling Price = Cost x (1 + Markup%).
            Markup is different from margin — a 100% markup results in a 50% profit margin, because
            the profit is half of the selling price.
          </p>
        </section>
      </div>
    </div>
  );
}
