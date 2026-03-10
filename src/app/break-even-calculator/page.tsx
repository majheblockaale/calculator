"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function BreakEvenCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");

  const results = useMemo(() => {
    const fc = parseFloat(fixedCosts);
    const vc = parseFloat(variableCostPerUnit);
    const price = parseFloat(pricePerUnit);

    if (isNaN(fc) || fc < 0 || isNaN(vc) || vc < 0 || isNaN(price) || price <= 0 || price <= vc) return null;

    const contributionMargin = price - vc;
    const contributionMarginRatio = contributionMargin / price;
    const breakEvenUnits = Math.ceil(fc / contributionMargin);
    const breakEvenRevenue = fc / contributionMarginRatio;

    const profitTable = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((mult) => {
      const units = Math.ceil(breakEvenUnits * mult);
      const revenue = units * price;
      const totalCost = fc + units * vc;
      const profit = revenue - totalCost;
      return { units, revenue, totalCost, profit };
    });

    return { breakEvenUnits, breakEvenRevenue, contributionMargin, contributionMarginRatio, profitTable };
  }, [fixedCosts, variableCostPerUnit, pricePerUnit]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Break-Even Calculator</h1>
        <p className="text-muted text-center mb-8">Find out how many units you need to sell to cover your costs.</p>

        <AdBanner slot="break-even-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Fixed Costs ($)</label>
                <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="50,000" />
              </div>
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Variable Cost Per Unit ($)</label>
                <input type="number" value={variableCostPerUnit} onChange={(e) => setVariableCostPerUnit(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="25" step="0.01" />
              </div>
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Price Per Unit ($)</label>
                <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="75" step="0.01" />
              </div>

              {results && (
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Break-Even Point</p>
                    <p className="text-3xl font-bold font-mono text-primary">{results.breakEvenUnits.toLocaleString()} units</p>
                  </div>
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Break-Even Revenue</p>
                    <p className="text-2xl font-bold font-mono text-primary">${fmt(results.breakEvenRevenue)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Contribution Margin</p>
                      <p className="font-bold font-mono">${fmt(results.contributionMargin)}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">CM Ratio</p>
                      <p className="font-bold font-mono">{(results.contributionMarginRatio * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Profit Analysis</h3>
                <div className="bg-display-bg border border-display-border rounded-xl overflow-hidden">
                  <table className="w-full text-sm font-mono">
                    <thead>
                      <tr className="border-b border-display-border text-muted">
                        <th className="text-left px-3 py-2">Units</th>
                        <th className="text-right px-3 py-2">Revenue</th>
                        <th className="text-right px-3 py-2">Profit/Loss</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.profitTable.map((row) => (
                        <tr key={row.units} className="border-b border-display-border last:border-0">
                          <td className="px-3 py-2">{row.units.toLocaleString()}</td>
                          <td className="text-right px-3 py-2">${fmt(row.revenue)}</td>
                          <td className={`text-right px-3 py-2 font-bold ${row.profit >= 0 ? "text-green-400" : "text-red-500"}`}>
                            {row.profit >= 0 ? "+" : ""}${fmt(row.profit)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <AdBanner slot="break-even-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Understanding Break-Even Analysis</h2>
          <p className="text-muted mb-4">
            The break-even point is where total revenue equals total costs. Below this point, the business
            operates at a loss; above it, the business earns a profit. The formula is: Break-Even Units =
            Fixed Costs / (Price Per Unit - Variable Cost Per Unit).
          </p>
          <p className="text-muted">
            The contribution margin is the amount each unit sale contributes toward covering fixed costs
            and generating profit. A higher contribution margin ratio means fewer units needed to break even.
          </p>
        </section>
      </div>
    </div>
  );
}
