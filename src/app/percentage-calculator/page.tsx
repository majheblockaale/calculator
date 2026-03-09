"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";

export default function PercentageCalculatorPage() {
  // What is X% of Y?
  const [pct1, setPct1] = useState("");
  const [val1, setVal1] = useState("");

  // X is what % of Y?
  const [val2a, setVal2a] = useState("");
  const [val2b, setVal2b] = useState("");

  // % increase/decrease from X to Y
  const [val3a, setVal3a] = useState("");
  const [val3b, setVal3b] = useState("");

  // Increase/decrease X by Y%
  const [val4, setVal4] = useState("");
  const [pct4, setPct4] = useState("");

  const r1 = pct1 && val1 ? (parseFloat(pct1) / 100) * parseFloat(val1) : null;
  const r2 = val2a && val2b && parseFloat(val2b) !== 0 ? (parseFloat(val2a) / parseFloat(val2b)) * 100 : null;
  const r3 = val3a && val3b && parseFloat(val3a) !== 0 ? ((parseFloat(val3b) - parseFloat(val3a)) / parseFloat(val3a)) * 100 : null;
  const r4inc = val4 && pct4 ? parseFloat(val4) * (1 + parseFloat(pct4) / 100) : null;
  const r4dec = val4 && pct4 ? parseFloat(val4) * (1 - parseFloat(pct4) / 100) : null;

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Percentage Calculator</h1>
        <p className="text-muted text-center mb-8">All percentage calculations in one place.</p>

        <AdBanner slot="pct-top" format="horizontal" className="mb-8" />

        <div className="max-w-2xl mx-auto space-y-6">
          {/* What is X% of Y? */}
          <div className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">What is X% of Y?</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-muted">What is</span>
              <input type="number" value={pct1} onChange={(e) => setPct1(e.target.value)}
                className="w-24 bg-display-bg border border-display-border rounded-lg px-3 py-2 font-mono text-center focus:outline-none focus:border-primary" placeholder="15" />
              <span className="text-muted">% of</span>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)}
                className="w-32 bg-display-bg border border-display-border rounded-lg px-3 py-2 font-mono text-center focus:outline-none focus:border-primary" placeholder="200" />
              <span className="text-muted">=</span>
              <span className="font-bold font-mono text-lg text-primary">
                {r1 !== null && !isNaN(r1) ? r1.toLocaleString(undefined, { maximumFractionDigits: 4 }) : "?"}
              </span>
            </div>
          </div>

          {/* X is what % of Y? */}
          <div className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">X is what % of Y?</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <input type="number" value={val2a} onChange={(e) => setVal2a(e.target.value)}
                className="w-28 bg-display-bg border border-display-border rounded-lg px-3 py-2 font-mono text-center focus:outline-none focus:border-primary" placeholder="30" />
              <span className="text-muted">is what % of</span>
              <input type="number" value={val2b} onChange={(e) => setVal2b(e.target.value)}
                className="w-28 bg-display-bg border border-display-border rounded-lg px-3 py-2 font-mono text-center focus:outline-none focus:border-primary" placeholder="200" />
              <span className="text-muted">=</span>
              <span className="font-bold font-mono text-lg text-primary">
                {r2 !== null && !isNaN(r2) ? `${r2.toFixed(2)}%` : "?"}
              </span>
            </div>
          </div>

          {/* % change from X to Y */}
          <div className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Percentage Change from X to Y</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-muted">From</span>
              <input type="number" value={val3a} onChange={(e) => setVal3a(e.target.value)}
                className="w-28 bg-display-bg border border-display-border rounded-lg px-3 py-2 font-mono text-center focus:outline-none focus:border-primary" placeholder="50" />
              <span className="text-muted">to</span>
              <input type="number" value={val3b} onChange={(e) => setVal3b(e.target.value)}
                className="w-28 bg-display-bg border border-display-border rounded-lg px-3 py-2 font-mono text-center focus:outline-none focus:border-primary" placeholder="75" />
              <span className="text-muted">=</span>
              <span className={`font-bold font-mono text-lg ${r3 !== null && r3 >= 0 ? "text-green-500" : "text-red-500"}`}>
                {r3 !== null && !isNaN(r3) ? `${r3 >= 0 ? "+" : ""}${r3.toFixed(2)}%` : "?"}
              </span>
            </div>
          </div>

          {/* Increase/decrease by % */}
          <div className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Increase / Decrease X by Y%</h3>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <input type="number" value={val4} onChange={(e) => setVal4(e.target.value)}
                className="w-28 bg-display-bg border border-display-border rounded-lg px-3 py-2 font-mono text-center focus:outline-none focus:border-primary" placeholder="100" />
              <span className="text-muted">by</span>
              <input type="number" value={pct4} onChange={(e) => setPct4(e.target.value)}
                className="w-24 bg-display-bg border border-display-border rounded-lg px-3 py-2 font-mono text-center focus:outline-none focus:border-primary" placeholder="20" />
              <span className="text-muted">%</span>
            </div>
            {r4inc !== null && !isNaN(r4inc) && (
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted">Increase: </span>
                  <span className="font-bold font-mono text-green-500">{r4inc.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                </div>
                <div>
                  <span className="text-muted">Decrease: </span>
                  <span className="font-bold font-mono text-red-500">{r4dec?.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How to Calculate Percentages</h2>
          <p className="text-muted">
            A percentage is a fraction of 100. To find X% of a number, multiply the number by X/100.
            To find what percentage X is of Y, divide X by Y and multiply by 100.
            Percentage change = ((New - Old) / Old) × 100.
          </p>
        </section>
      </div>
    </div>
  );
}
