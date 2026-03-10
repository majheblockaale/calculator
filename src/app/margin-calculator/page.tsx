"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type InputMode = "cost_revenue" | "cost_margin" | "revenue_margin";

export default function MarginCalculatorPage() {
  const [inputMode, setInputMode] = useState<InputMode>("cost_revenue");
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");
  const [marginPct, setMarginPct] = useState("");

  const results = useMemo(() => {
    let c: number, r: number;

    if (inputMode === "cost_revenue") {
      c = parseFloat(cost);
      r = parseFloat(revenue);
      if (isNaN(c) || c < 0 || isNaN(r) || r <= 0) return null;
    } else if (inputMode === "cost_margin") {
      c = parseFloat(cost);
      const m = parseFloat(marginPct) / 100;
      if (isNaN(c) || c < 0 || isNaN(m) || m >= 1 || m < 0) return null;
      r = c / (1 - m);
    } else {
      r = parseFloat(revenue);
      const m = parseFloat(marginPct) / 100;
      if (isNaN(r) || r <= 0 || isNaN(m) || m >= 1 || m < 0) return null;
      c = r * (1 - m);
    }

    const profit = r - c;
    const margin = r > 0 ? (profit / r) * 100 : 0;
    const markup = c > 0 ? (profit / c) * 100 : 0;

    return { cost: c, revenue: r, profit, margin, markup };
  }, [inputMode, cost, revenue, marginPct]);

  const modes: { key: InputMode; label: string }[] = [
    { key: "cost_revenue", label: "Cost & Revenue" },
    { key: "cost_margin", label: "Cost & Margin" },
    { key: "revenue_margin", label: "Revenue & Margin" },
  ];

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Margin Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate profit margin, markup, and profitability from any two values.</p>

        <AdBanner slot="margin-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-2 mb-6">
                {modes.map((m) => (
                  <button key={m.key} onClick={() => setInputMode(m.key)}
                    className={`py-2 rounded-lg text-xs font-semibold transition-colors ${
                      inputMode === m.key ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}>
                    {m.label}
                  </button>
                ))}
              </div>

              {(inputMode === "cost_revenue" || inputMode === "cost_margin") && (
                <div className="mb-4">
                  <label className="text-sm text-muted mb-1 block">Cost ($)</label>
                  <input type="number" value={cost} onChange={(e) => setCost(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                    placeholder="40" step="0.01" />
                </div>
              )}

              {(inputMode === "cost_revenue" || inputMode === "revenue_margin") && (
                <div className="mb-4">
                  <label className="text-sm text-muted mb-1 block">Revenue / Selling Price ($)</label>
                  <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                    placeholder="100" step="0.01" />
                </div>
              )}

              {(inputMode === "cost_margin" || inputMode === "revenue_margin") && (
                <div className="mb-6">
                  <label className="text-sm text-muted mb-1 block">Desired Margin (%)</label>
                  <input type="number" value={marginPct} onChange={(e) => setMarginPct(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                    placeholder="60" step="0.1" />
                </div>
              )}

              {results && (
                <div className="space-y-3 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                      <p className="text-sm text-muted mb-1">Margin</p>
                      <p className="text-3xl font-bold font-mono text-primary">{results.margin.toFixed(2)}%</p>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                      <p className="text-sm text-muted mb-1">Markup</p>
                      <p className="text-3xl font-bold font-mono text-primary">{results.markup.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Cost</p>
                      <p className="font-bold font-mono text-sm">${fmt(results.cost)}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Revenue</p>
                      <p className="font-bold font-mono text-sm">${fmt(results.revenue)}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Profit</p>
                      <p className="font-bold font-mono text-sm text-green-400">${fmt(results.profit)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="margin-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Margin vs Markup</h2>
          <p className="text-muted mb-4">
            Margin and markup both measure profitability but from different bases.
            Margin = (Revenue - Cost) / Revenue. Markup = (Revenue - Cost) / Cost.
            A 50% margin equals a 100% markup. Margin is always lower than markup for the same transaction.
          </p>
          <p className="text-muted">
            Understanding both metrics is critical for pricing strategy. Margin tells you what percentage
            of the selling price is profit, while markup tells you how much you added on top of cost.
          </p>
        </section>
      </div>
    </div>
  );
}
