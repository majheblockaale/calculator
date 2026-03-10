"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function PaymentCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");

  const results = useMemo(() => {
    const total = parseFloat(loanAmount);
    const down = parseFloat(downPayment) || 0;
    const P = total - down;
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (isNaN(P) || P <= 0 || isNaN(annualRate) || annualRate <= 0 || isNaN(years) || years <= 0) return null;

    const r = annualRate / 100 / 12;
    const n = years * 12;
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - P;

    // Compare different terms
    const comparisons = [1, 2, 3, 5, 7, 10, 15, 20, 30]
      .filter((y) => y !== years)
      .slice(0, 5)
      .map((y) => {
        const m = y * 12;
        const pmt = (P * r * Math.pow(1 + r, m)) / (Math.pow(1 + r, m) - 1);
        const totInt = pmt * m - P;
        return { years: y, monthly: pmt, totalInterest: totInt };
      });

    return { loanPrincipal: P, monthly, totalPaid, totalInterest, comparisons };
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Payment Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate monthly payments for any loan and compare terms.</p>

        <AdBanner slot="payment-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Total Amount ($)</label>
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="30,000" />
              </div>
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Down Payment ($)</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="5,000" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-muted mb-1 block">Interest Rate (%)</label>
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Term (Years)</label>
                  <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              {results && (
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Monthly Payment</p>
                    <p className="text-4xl font-bold font-mono text-primary">${fmt(results.monthly)}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Loan Amount</p>
                      <p className="font-bold font-mono text-sm">${fmt(results.loanPrincipal)}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Interest</p>
                      <p className="font-bold font-mono text-sm text-red-500">${fmt(results.totalInterest)}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Paid</p>
                      <p className="font-bold font-mono text-sm">${fmt(results.totalPaid)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 space-y-6">
            {results && results.comparisons.length > 0 && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Compare Different Terms</h3>
                <div className="bg-display-bg border border-display-border rounded-xl overflow-hidden">
                  <table className="w-full text-sm font-mono">
                    <thead>
                      <tr className="border-b border-display-border text-muted">
                        <th className="text-left px-3 py-2">Term</th>
                        <th className="text-right px-3 py-2">Monthly</th>
                        <th className="text-right px-3 py-2">Total Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.comparisons.map((row) => (
                        <tr key={row.years} className="border-b border-display-border last:border-0">
                          <td className="px-3 py-2">{row.years} yr</td>
                          <td className="text-right px-3 py-2">${fmt(row.monthly)}</td>
                          <td className="text-right px-3 py-2 text-red-400">${fmt(row.totalInterest)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <AdBanner slot="payment-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Loan Payments Are Calculated</h2>
          <p className="text-muted">
            Monthly loan payments are calculated using the amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1].
            A shorter loan term means higher monthly payments but significantly less total interest.
            A larger down payment reduces the principal, lowering both the monthly payment and total interest cost.
          </p>
        </section>
      </div>
    </div>
  );
}
