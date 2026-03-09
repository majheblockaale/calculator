"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const tipPresets = [10, 15, 18, 20, 25, 30];

export default function TipCalculatorPage() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [splitCount, setSplitCount] = useState(1);

  const activeTip = customTip ? parseFloat(customTip) : tipPercent;

  const results = useMemo(() => {
    const billAmt = parseFloat(bill);
    if (isNaN(billAmt) || billAmt <= 0 || isNaN(activeTip)) {
      return { tip: 0, total: 0, perPerson: 0 };
    }
    const tip = billAmt * (activeTip / 100);
    const total = billAmt + tip;
    const perPerson = total / Math.max(splitCount, 1);
    return { tip, total, perPerson };
  }, [bill, activeTip, splitCount]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Tip Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate tips and split bills easily.</p>

        <AdBanner slot="tip-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Bill amount */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Bill Amount ($)</label>
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="0.00"
                />
              </div>

              {/* Tip percentage */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-2 block">Tip Percentage</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {tipPresets.map((pct) => (
                    <button
                      key={pct}
                      onClick={() => { setTipPercent(pct); setCustomTip(""); }}
                      className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                        !customTip && tipPercent === pct ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  placeholder="Custom tip %"
                />
              </div>

              {/* Split */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Split Between</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                    className="w-10 h-10 rounded-lg bg-btn-bg hover:bg-btn-hover flex items-center justify-center text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold font-mono w-10 text-center">{splitCount}</span>
                  <button
                    onClick={() => setSplitCount(splitCount + 1)}
                    className="w-10 h-10 rounded-lg bg-btn-bg hover:bg-btn-hover flex items-center justify-center text-lg font-bold"
                  >
                    +
                  </button>
                  <span className="text-sm text-muted">{splitCount === 1 ? "person" : "people"}</span>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                  <span className="text-sm text-muted">Tip Amount</span>
                  <span className="text-xl font-bold font-mono">${results.tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                  <span className="text-sm text-muted">Total</span>
                  <span className="text-xl font-bold font-mono">${results.total.toFixed(2)}</span>
                </div>
                {splitCount > 1 && (
                  <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">Per Person</span>
                    <span className="text-2xl font-bold font-mono text-primary">${results.perPerson.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="tip-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How to Calculate a Tip</h2>
          <p className="text-muted mb-4">
            To calculate a tip, multiply the bill amount by the tip percentage divided by 100.
            For example, a 20% tip on a $50 bill is $50 x 0.20 = $10.00.
          </p>
        </section>
      </div>
    </div>
  );
}
