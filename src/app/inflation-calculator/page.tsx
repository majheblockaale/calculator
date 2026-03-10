"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function InflationCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("3");
  const [years, setYears] = useState("10");

  const results = useMemo(() => {
    const amt = parseFloat(amount);
    const rate = parseFloat(inflationRate) / 100;
    const yrs = parseFloat(years);

    if (isNaN(amt) || amt <= 0 || isNaN(rate) || rate <= 0 || isNaN(yrs) || yrs <= 0) return null;

    const futureValue = amt * Math.pow(1 + rate, yrs);
    const purchasingPower = amt / Math.pow(1 + rate, yrs);
    const totalInflation = ((futureValue - amt) / amt) * 100;

    const breakdown = Array.from({ length: Math.min(Math.ceil(yrs), 50) }, (_, i) => {
      const y = i + 1;
      const equivalent = amt * Math.pow(1 + rate, y);
      const buying = amt / Math.pow(1 + rate, y);
      return { year: y, equivalent, buyingPower: buying };
    });

    return { futureValue, purchasingPower, totalInflation, breakdown };
  }, [amount, inflationRate, years]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Inflation Calculator</h1>
        <p className="text-muted text-center mb-8">See how inflation erodes purchasing power over time.</p>

        <AdBanner slot="inflation-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Current Amount ($)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="100,000" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-muted mb-1 block">Inflation Rate (%)</label>
                  <input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Years</label>
                  <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary" />
                </div>
              </div>

              {results && (
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">You&apos;ll Need This Much in {years} Years</p>
                    <p className="text-3xl font-bold font-mono text-primary">${fmt(results.futureValue)}</p>
                  </div>
                  <div className="bg-display-bg border border-display-border rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Today&apos;s Money Will Be Worth</p>
                    <p className="text-2xl font-bold font-mono text-red-500">${fmt(results.purchasingPower)}</p>
                  </div>
                  <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                    <p className="text-xs text-muted">Total Inflation Over Period</p>
                    <p className="font-bold font-mono">{results.totalInflation.toFixed(1)}%</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Year-by-Year Impact</h3>
                <div className="bg-display-bg border border-display-border rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                  <table className="w-full text-sm font-mono">
                    <thead className="sticky top-0 bg-display-bg">
                      <tr className="border-b border-display-border text-muted">
                        <th className="text-left px-3 py-2">Year</th>
                        <th className="text-right px-3 py-2">Equivalent Cost</th>
                        <th className="text-right px-3 py-2">Buying Power</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.breakdown.map((row) => (
                        <tr key={row.year} className="border-b border-display-border last:border-0">
                          <td className="px-3 py-2">{row.year}</td>
                          <td className="text-right px-3 py-2">${fmt(row.equivalent)}</td>
                          <td className="text-right px-3 py-2 text-red-400">${fmt(row.buyingPower)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <AdBanner slot="inflation-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Inflation Affects Your Money</h2>
          <p className="text-muted">
            Inflation reduces the purchasing power of money over time. At 3% annual inflation, prices
            double roughly every 24 years. This means $100 today will only buy about $50 worth of goods
            in 24 years. To maintain your standard of living, investments and savings must outpace inflation.
          </p>
        </section>
      </div>
    </div>
  );
}
