"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

export default function AutoLoanCalculatorPage() {
  const [vehiclePrice, setVehiclePrice] = useState("35000");
  const [downPayment, setDownPayment] = useState("5000");
  const [tradeInValue, setTradeInValue] = useState("0");
  const [salesTax, setSalesTax] = useState("6.0");
  const [interestRate, setInterestRate] = useState("5.9");
  const [loanTerm, setLoanTerm] = useState("60");

  const results = useMemo(() => {
    const price = parseFloat(vehiclePrice);
    const down = parseFloat(downPayment || "0");
    const tradeIn = parseFloat(tradeInValue || "0");
    const taxRate = parseFloat(salesTax || "0") / 100;
    const annualRate = parseFloat(interestRate);
    const months = parseFloat(loanTerm);

    if (isNaN(price) || isNaN(annualRate) || isNaN(months) || price <= 0 || annualRate <= 0 || months <= 0) {
      return null;
    }

    const taxableAmount = price - tradeIn;
    const tax = taxableAmount > 0 ? taxableAmount * taxRate : 0;
    const loanAmount = price + tax - down - tradeIn;

    if (loanAmount <= 0) return null;

    const r = annualRate / 100 / 12;
    const monthlyPayment = (loanAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - loanAmount;
    const totalCost = price + tax;

    return { loanAmount, monthlyPayment, totalPaid, totalInterest, totalCost, tax };
  }, [vehiclePrice, downPayment, tradeInValue, salesTax, interestRate, loanTerm]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Auto Loan Calculator</h1>
        <p className="text-muted text-center mb-8">Estimate your monthly car payment and total cost of financing.</p>

        <AdBanner slot="autoloan-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Vehicle Price ($)</label>
                  <input type="number" value={vehiclePrice} onChange={(e) => setVehiclePrice(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted mb-1 block">Down Payment ($)</label>
                    <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-muted mb-1 block">Trade-in Value ($)</label>
                    <input type="number" value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted mb-1 block">Sales Tax (%)</label>
                    <input type="number" step="0.1" value={salesTax} onChange={(e) => setSalesTax(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-muted mb-1 block">Interest Rate (%)</label>
                    <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Loan Term</label>
                  <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary">
                    <option value="36">36 months (3 years)</option>
                    <option value="48">48 months (4 years)</option>
                    <option value="60">60 months (5 years)</option>
                    <option value="72">72 months (6 years)</option>
                    <option value="84">84 months (7 years)</option>
                  </select>
                </div>
              </div>

              {results && (
                <div className="mt-6 space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Monthly Payment</p>
                    <p className="text-4xl font-bold font-mono text-primary">${results.monthlyPayment.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Loan Amount</p>
                      <p className="font-bold font-mono">${Math.round(results.loanAmount).toLocaleString()}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Sales Tax</p>
                      <p className="font-bold font-mono">${Math.round(results.tax).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Interest</p>
                      <p className="font-bold font-mono text-red-500">${Math.round(results.totalInterest).toLocaleString()}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Cost</p>
                      <p className="font-bold font-mono">${Math.round(results.totalPaid).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Principal vs Interest bar */}
                  <div className="mt-2">
                    <div className="flex rounded-full overflow-hidden h-3">
                      <div className="bg-primary" style={{ width: `${(results.loanAmount / results.totalPaid) * 100}%` }} />
                      <div className="bg-red-400" style={{ width: `${(results.totalInterest / results.totalPaid) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>Principal ({((results.loanAmount / results.totalPaid) * 100).toFixed(0)}%)</span>
                      <span>Interest ({((results.totalInterest / results.totalPaid) * 100).toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Cost Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Vehicle Price</span>
                    <span className="font-mono">${parseFloat(vehiclePrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Sales Tax</span>
                    <span className="font-mono">+${Math.round(results.tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Down Payment</span>
                    <span className="font-mono">-${parseFloat(downPayment || "0").toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Trade-in Value</span>
                    <span className="font-mono">-${parseFloat(tradeInValue || "0").toLocaleString()}</span>
                  </div>
                  <div className="border-t border-card-border pt-2 flex justify-between font-bold">
                    <span>Amount Financed</span>
                    <span className="font-mono">${Math.round(results.loanAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Total Interest</span>
                    <span className="font-mono text-red-500">+${Math.round(results.totalInterest).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-card-border pt-2 flex justify-between font-bold">
                    <span>Total of All Payments</span>
                    <span className="font-mono">${Math.round(results.totalPaid).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
            <AdBanner slot="autoloan-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Auto Loan Payments Are Calculated</h2>
          <p className="text-muted">
            Auto loan payments are calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1].
            The financed amount (P) is the vehicle price plus sales tax, minus your down payment and trade-in value.
            The monthly interest rate (r) is the annual rate divided by 12, and n is the total number of monthly payments.
            Shorter loan terms mean higher monthly payments but less total interest paid. Longer terms reduce your monthly
            payment but increase the overall cost of the vehicle due to additional interest charges.
          </p>
        </section>
      </div>
    </div>
  );
}
