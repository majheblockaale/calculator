"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ROICalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [inputMode, setInputMode] = useState<"years" | "dates">("years");
  const [years, setYears] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [savingsRate, setSavingsRate] = useState("4.5");

  const investmentYears = useMemo(() => {
    if (inputMode === "years") {
      return parseFloat(years);
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffMs = end.getTime() - start.getTime();
      return diffMs / (1000 * 60 * 60 * 24 * 365.25);
    }
    return NaN;
  }, [inputMode, years, startDate, endDate]);

  const results = useMemo(() => {
    const initial = parseFloat(initialInvestment);
    const final_ = parseFloat(finalValue);
    const yrs = investmentYears;
    const savRate = parseFloat(savingsRate) || 0;

    if (isNaN(initial) || initial <= 0 || isNaN(final_) || final_ < 0 || isNaN(yrs) || yrs <= 0) {
      return null;
    }

    const netProfit = final_ - initial;
    const totalROI = (netProfit / initial) * 100;
    const annualizedROI = (Math.pow(final_ / initial, 1 / yrs) - 1) * 100;

    // Savings account comparison
    const savingsFinalValue = initial * Math.pow(1 + savRate / 100, yrs);
    const savingsProfit = savingsFinalValue - initial;
    const differenceVsSavings = netProfit - savingsProfit;

    return {
      netProfit,
      totalROI,
      annualizedROI,
      savingsFinalValue,
      savingsProfit,
      differenceVsSavings,
      investmentYears: yrs,
    };
  }, [initialInvestment, finalValue, investmentYears, savingsRate]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">ROI Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate your return on investment and compare with alternatives.</p>

        <AdBanner slot="roi-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Initial investment */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Initial Investment ($)</label>
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="10,000"
                  min="0"
                />
              </div>

              {/* Final value */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Final Value ($)</label>
                <input
                  type="number"
                  value={finalValue}
                  onChange={(e) => setFinalValue(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="15,000"
                  min="0"
                />
              </div>

              {/* Time period mode */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-2 block">Investment Period</label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={() => setInputMode("years")}
                    className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                      inputMode === "years" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Years
                  </button>
                  <button
                    onClick={() => setInputMode("dates")}
                    className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                      inputMode === "dates" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Specific Dates
                  </button>
                </div>

                {inputMode === "years" ? (
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                    placeholder="5"
                    min="0"
                    step="0.1"
                  />
                ) : (
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary"
                    />
                  </div>
                )}
              </div>

              {/* Savings rate for comparison */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Savings Account Rate for Comparison (%)</label>
                <input
                  type="number"
                  value={savingsRate}
                  onChange={(e) => setSavingsRate(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="4.5"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Results */}
              {results && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">Total ROI</span>
                    <span className="text-2xl font-bold font-mono text-primary">{results.totalROI.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">Annualized ROI</span>
                    <span className="text-2xl font-bold font-mono text-primary">{results.annualizedROI.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Net Profit</span>
                    <span className={`text-xl font-bold font-mono ${results.netProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
                      ${fmt(results.netProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Period</span>
                    <span className="text-lg font-bold font-mono">{results.investmentYears.toFixed(1)} years</span>
                  </div>

                  {/* Savings comparison */}
                  <div className="mt-4 pt-4 border-t border-card-border">
                    <h3 className="text-sm font-semibold text-muted mb-3">Savings Account Comparison ({savingsRate}%)</h3>
                    <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3 mb-2">
                      <span className="text-sm text-muted">Savings Final Value</span>
                      <span className="text-lg font-bold font-mono">${fmt(results.savingsFinalValue)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                      <span className="text-sm text-muted">Difference vs. Savings</span>
                      <span className={`text-lg font-bold font-mono ${results.differenceVsSavings >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {results.differenceVsSavings >= 0 ? "+" : ""}${fmt(results.differenceVsSavings)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="roi-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Understanding Return on Investment</h2>
          <p className="text-muted mb-4">
            Return on Investment (ROI) measures the profitability of an investment relative to its cost.
            Total ROI is calculated as (Final Value - Initial Investment) / Initial Investment x 100%.
            A positive ROI indicates a profit, while a negative ROI indicates a loss.
          </p>
          <p className="text-muted mb-4">
            Annualized ROI adjusts the total return to a per-year basis, making it easier to compare
            investments of different durations. It is calculated using the formula:
            (Final / Initial)^(1/years) - 1. This is also known as the Compound Annual Growth Rate (CAGR).
          </p>
          <p className="text-muted">
            Comparing your investment returns against a simple savings account helps you understand
            whether the additional risk was worthwhile. A good investment should ideally outperform
            risk-free alternatives like savings accounts or treasury bonds.
          </p>
        </section>
      </div>
    </div>
  );
}
