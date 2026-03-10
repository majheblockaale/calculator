"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

type FilingStatus = "single" | "married_jointly" | "married_separately" | "head_of_household";

const standardDeductions: Record<FilingStatus, number> = {
  single: 14600,
  married_jointly: 29200,
  married_separately: 14600,
  head_of_household: 21900,
};

const taxBrackets: Record<FilingStatus, { min: number; max: number; rate: number }[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married_jointly: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  married_separately: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

const filingLabels: Record<FilingStatus, string> = {
  single: "Single",
  married_jointly: "Married Filing Jointly",
  married_separately: "Married Filing Separately",
  head_of_household: "Head of Household",
};

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function IncomeTaxCalculatorPage() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [income, setIncome] = useState("");
  const [deductionType, setDeductionType] = useState<"standard" | "custom">("standard");
  const [customDeduction, setCustomDeduction] = useState("");

  const results = useMemo(() => {
    const grossIncome = parseFloat(income);
    if (isNaN(grossIncome) || grossIncome <= 0) return null;

    const deduction = deductionType === "standard" ? standardDeductions[filingStatus] : (parseFloat(customDeduction) || 0);
    const taxableIncome = Math.max(0, grossIncome - deduction);
    const brackets = taxBrackets[filingStatus];

    let totalTax = 0;
    let marginalRate = 0;
    const breakdown: { rate: number; rangeMin: number; rangeMax: number; taxableInBracket: number; taxForBracket: number }[] = [];

    for (const bracket of brackets) {
      if (taxableIncome <= bracket.min) break;
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      const taxForBracket = taxableInBracket * bracket.rate;
      totalTax += taxForBracket;
      marginalRate = bracket.rate;
      breakdown.push({
        rate: bracket.rate,
        rangeMin: bracket.min,
        rangeMax: Math.min(bracket.max, taxableIncome),
        taxableInBracket,
        taxForBracket,
      });
    }

    const effectiveRate = taxableIncome > 0 ? totalTax / grossIncome : 0;
    const afterTax = grossIncome - totalTax;

    return { taxableIncome, totalTax, effectiveRate, marginalRate, afterTax, breakdown, deduction };
  }, [income, filingStatus, deductionType, customDeduction]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Income Tax Calculator</h1>
        <p className="text-muted text-center mb-8">Estimate your 2024 US federal income tax.</p>

        <AdBanner slot="income-tax-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Filing Status */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Filing Status</label>
                <select
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary"
                >
                  {Object.entries(filingLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Annual Income */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Annual Income ($)</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="75,000"
                />
              </div>

              {/* Deductions */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-2 block">Deductions</label>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setDeductionType("standard")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      deductionType === "standard" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Standard (${fmt(standardDeductions[filingStatus])})
                  </button>
                  <button
                    onClick={() => setDeductionType("custom")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      deductionType === "custom" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Custom
                  </button>
                </div>
                {deductionType === "custom" && (
                  <input
                    type="number"
                    value={customDeduction}
                    onChange={(e) => setCustomDeduction(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary"
                    placeholder="Enter deduction amount"
                  />
                )}
              </div>

              {/* Results */}
              {results && (
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Taxable Income</span>
                    <span className="text-lg font-bold font-mono">${fmt(results.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Effective Tax Rate</span>
                    <span className="text-lg font-bold font-mono">{(results.effectiveRate * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Marginal Tax Rate</span>
                    <span className="text-lg font-bold font-mono">{(results.marginalRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Total Federal Tax</span>
                    <span className="text-lg font-bold font-mono text-red-400">${fmt(results.totalTax)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">After-Tax Income</span>
                    <span className="text-2xl font-bold font-mono text-primary">${fmt(results.afterTax)}</span>
                  </div>

                  {/* Bracket Breakdown */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-muted mb-3">Tax Bracket Breakdown</h3>
                    <div className="bg-display-bg border border-display-border rounded-xl overflow-hidden">
                      <table className="w-full text-sm font-mono">
                        <thead>
                          <tr className="border-b border-display-border text-muted">
                            <th className="text-left px-3 py-2">Rate</th>
                            <th className="text-right px-3 py-2">Taxable</th>
                            <th className="text-right px-3 py-2">Tax</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.breakdown.map((row, i) => (
                            <tr key={i} className="border-b border-display-border last:border-0">
                              <td className="px-3 py-2">{(row.rate * 100).toFixed(0)}%</td>
                              <td className="text-right px-3 py-2">${fmt(row.taxableInBracket)}</td>
                              <td className="text-right px-3 py-2">${fmt(row.taxForBracket)}</td>
                            </tr>
                          ))}
                          <tr className="font-bold">
                            <td className="px-3 py-2">Total</td>
                            <td className="text-right px-3 py-2">${fmt(results.taxableIncome)}</td>
                            <td className="text-right px-3 py-2">${fmt(results.totalTax)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="income-tax-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Understanding Federal Income Tax Brackets</h2>
          <p className="text-muted mb-4">
            The US federal income tax system uses a progressive structure where higher portions of
            your income are taxed at higher rates. Your marginal tax rate is the rate applied to
            your last dollar of income, while your effective tax rate is the overall percentage of
            income you pay in taxes. Standard deductions reduce your taxable income before brackets
            are applied, potentially lowering both your total tax and effective rate.
          </p>
        </section>
      </div>
    </div>
  );
}
