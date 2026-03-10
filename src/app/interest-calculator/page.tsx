"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type InterestType = "simple" | "compound";
type CompoundFreq = "daily" | "monthly" | "quarterly" | "yearly";

const freqMap: Record<CompoundFreq, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
};

export default function InterestCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [interestType, setInterestType] = useState<InterestType>("compound");
  const [frequency, setFrequency] = useState<CompoundFreq>("monthly");

  const results = useMemo(() => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);

    if (isNaN(P) || P <= 0 || isNaN(r) || r <= 0 || isNaN(t) || t <= 0) return null;

    if (interestType === "simple") {
      const interest = P * r * t;
      const total = P + interest;
      const yearlyBreakdown = Array.from({ length: Math.ceil(t) }, (_, i) => {
        const y = i + 1;
        const accInterest = P * r * Math.min(y, t);
        return { year: y, interest: accInterest, balance: P + accInterest };
      });
      return { interest, total, effectiveRate: r * 100, yearlyBreakdown };
    }

    const n = freqMap[frequency];
    const total = P * Math.pow(1 + r / n, n * t);
    const interest = total - P;
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

    const yearlyBreakdown = Array.from({ length: Math.ceil(t) }, (_, i) => {
      const y = i + 1;
      const bal = P * Math.pow(1 + r / n, n * Math.min(y, t));
      return { year: y, interest: bal - P, balance: bal };
    });

    return { interest, total, effectiveRate, yearlyBreakdown };
  }, [principal, rate, years, interestType, frequency]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Interest Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate simple or compound interest on your savings and investments.</p>

        <AdBanner slot="interest-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Interest type toggle */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                <button
                  onClick={() => setInterestType("simple")}
                  className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                    interestType === "simple" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                  }`}
                >
                  Simple Interest
                </button>
                <button
                  onClick={() => setInterestType("compound")}
                  className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                    interestType === "compound" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                  }`}
                >
                  Compound Interest
                </button>
              </div>

              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Principal Amount ($)</label>
                <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="10,000" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Annual Rate (%)</label>
                  <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                    placeholder="5" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Time (Years)</label>
                  <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                    placeholder="10" />
                </div>
              </div>

              {interestType === "compound" && (
                <div className="mb-5">
                  <label className="text-sm text-muted mb-1 block">Compounding Frequency</label>
                  <select value={frequency} onChange={(e) => setFrequency(e.target.value as CompoundFreq)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary">
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}

              {results && (
                <div className="space-y-3 mt-6">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Total Amount</p>
                    <p className="text-3xl font-bold font-mono text-primary">${fmt(results.total)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Interest</p>
                      <p className="font-bold font-mono text-green-400">${fmt(results.interest)}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Effective Annual Rate</p>
                      <p className="font-bold font-mono">{results.effectiveRate.toFixed(3)}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Year-by-Year Breakdown</h3>
                <div className="bg-display-bg border border-display-border rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                  <table className="w-full text-sm font-mono">
                    <thead className="sticky top-0 bg-display-bg">
                      <tr className="border-b border-display-border text-muted">
                        <th className="text-left px-3 py-2">Year</th>
                        <th className="text-right px-3 py-2">Interest</th>
                        <th className="text-right px-3 py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.yearlyBreakdown.map((row) => (
                        <tr key={row.year} className="border-b border-display-border last:border-0">
                          <td className="px-3 py-2">{row.year}</td>
                          <td className="text-right px-3 py-2">${fmt(row.interest)}</td>
                          <td className="text-right px-3 py-2">${fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <AdBanner slot="interest-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Simple vs Compound Interest</h2>
          <p className="text-muted mb-4">
            Simple interest is calculated only on the original principal: I = P x r x t.
            It grows linearly over time and is commonly used for short-term loans and some bonds.
          </p>
          <p className="text-muted">
            Compound interest is calculated on the principal plus any previously accumulated interest:
            A = P(1 + r/n)^(nt). The more frequently interest compounds, the more you earn. This
            exponential growth effect becomes dramatic over long time periods, which is why starting
            to save early makes such a big difference.
          </p>
        </section>
      </div>
    </div>
  );
}
