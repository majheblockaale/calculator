"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type PayFreq = "weekly" | "biweekly" | "semimonthly" | "monthly";
type FilingStatus = "single" | "married" | "head_of_household";

const freqPeriods: Record<PayFreq, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

// Simplified 2024 federal tax brackets
const federalBrackets: Record<FilingStatus, { rate: number; min: number }[]> = {
  single: [
    { rate: 0.10, min: 0 },
    { rate: 0.12, min: 11600 },
    { rate: 0.22, min: 47150 },
    { rate: 0.24, min: 100525 },
    { rate: 0.32, min: 191950 },
    { rate: 0.35, min: 243725 },
    { rate: 0.37, min: 609350 },
  ],
  married: [
    { rate: 0.10, min: 0 },
    { rate: 0.12, min: 23200 },
    { rate: 0.22, min: 94300 },
    { rate: 0.24, min: 201050 },
    { rate: 0.32, min: 383900 },
    { rate: 0.35, min: 487450 },
    { rate: 0.37, min: 731200 },
  ],
  head_of_household: [
    { rate: 0.10, min: 0 },
    { rate: 0.12, min: 16550 },
    { rate: 0.22, min: 63100 },
    { rate: 0.24, min: 100500 },
    { rate: 0.32, min: 191950 },
    { rate: 0.35, min: 243700 },
    { rate: 0.37, min: 609350 },
  ],
};

function calcFederalTax(taxableIncome: number, status: FilingStatus): number {
  const brackets = federalBrackets[status];
  let tax = 0;
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].min) {
      tax += (taxableIncome - brackets[i].min) * brackets[i].rate;
      taxableIncome = brackets[i].min;
    }
  }
  return tax;
}

export default function PaycheckCalculatorPage() {
  const [grossPay, setGrossPay] = useState("");
  const [payFrequency, setPayFrequency] = useState<PayFreq>("biweekly");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [stateTaxRate, setStateTaxRate] = useState("5");
  const [retirement401k, setRetirement401k] = useState("0");

  const results = useMemo(() => {
    const gross = parseFloat(grossPay);
    if (isNaN(gross) || gross <= 0) return null;

    const periods = freqPeriods[payFrequency];
    const annualGross = gross * periods;
    const retPct = (parseFloat(retirement401k) || 0) / 100;
    const annual401k = annualGross * retPct;
    const taxableIncome = annualGross - annual401k;

    const annualFedTax = calcFederalTax(taxableIncome, filingStatus);
    const stateRate = (parseFloat(stateTaxRate) || 0) / 100;
    const annualStateTax = taxableIncome * stateRate;

    const ssRate = 0.062;
    const ssCap = 168600;
    const annualSS = Math.min(annualGross, ssCap) * ssRate;
    const annualMedicare = annualGross * 0.0145;

    const annualDeductions = annualFedTax + annualStateTax + annualSS + annualMedicare + annual401k;
    const annualNet = annualGross - annualDeductions;

    return {
      grossPerPeriod: gross,
      fedTax: annualFedTax / periods,
      stateTax: annualStateTax / periods,
      socialSecurity: annualSS / periods,
      medicare: annualMedicare / periods,
      retirement: annual401k / periods,
      netPay: annualNet / periods,
      effectiveRate: (annualDeductions / annualGross) * 100,
      annualGross,
      annualNet,
    };
  }, [grossPay, payFrequency, filingStatus, stateTaxRate, retirement401k]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Paycheck Calculator</h1>
        <p className="text-muted text-center mb-8">Estimate your take-home pay after taxes and deductions.</p>

        <AdBanner slot="paycheck-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Gross Pay Per Period ($)</label>
                <input type="number" value={grossPay} onChange={(e) => setGrossPay(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="3,000" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Pay Frequency</label>
                  <select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value as PayFreq)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary">
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="semimonthly">Semi-Monthly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Filing Status</label>
                  <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary">
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="head_of_household">Head of Household</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-muted mb-1 block">State Tax Rate (%)</label>
                  <input type="number" step="0.1" value={stateTaxRate} onChange={(e) => setStateTaxRate(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">401(k) Contrib. (%)</label>
                  <input type="number" step="1" value={retirement401k} onChange={(e) => setRetirement401k(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              {results && (
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Take-Home Pay</p>
                    <p className="text-3xl font-bold font-mono text-primary">${fmt(results.netPay)}</p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: "Gross Pay", amount: results.grossPerPeriod, color: "" },
                      { label: "Federal Tax", amount: -results.fedTax, color: "text-red-400" },
                      { label: "State Tax", amount: -results.stateTax, color: "text-red-400" },
                      { label: "Social Security", amount: -results.socialSecurity, color: "text-red-400" },
                      { label: "Medicare", amount: -results.medicare, color: "text-red-400" },
                      { label: "401(k)", amount: -results.retirement, color: "text-yellow-400" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center bg-display-bg border border-display-border rounded-lg px-3 py-2">
                        <span className="text-sm text-muted">{item.label}</span>
                        <span className={`font-mono font-bold text-sm ${item.color}`}>
                          {item.amount < 0 ? "-" : ""}${fmt(Math.abs(item.amount))}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                    <p className="text-xs text-muted">Effective Deduction Rate</p>
                    <p className="font-bold font-mono">{results.effectiveRate.toFixed(1)}%</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="paycheck-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Understanding Your Paycheck</h2>
          <p className="text-muted">
            Your take-home pay is your gross pay minus federal income tax, state income tax, Social Security
            (6.2% up to $168,600), Medicare (1.45%), and voluntary deductions like 401(k) contributions.
            This calculator provides estimates based on simplified tax brackets — actual withholding may
            vary based on W-4 elections, additional deductions, and local taxes.
          </p>
        </section>
      </div>
    </div>
  );
}
