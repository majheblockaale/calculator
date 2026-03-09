"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

export default function MortgageCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("300000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [downPayment, setDownPayment] = useState("60000");
  const [showAmortization, setShowAmortization] = useState(false);

  const results = useMemo(() => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment || "0");
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    if (isNaN(principal) || isNaN(rate) || isNaN(months) || principal <= 0 || rate <= 0 || months <= 0) {
      return null;
    }

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;

    // Amortization schedule
    const schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
    let balance = principal;
    for (let i = 1; i <= months && i <= 360; i++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      if (i <= 12 || i % 12 === 0 || i === months) {
        schedule.push({
          month: i,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
        });
      }
    }

    return { monthlyPayment, totalPaid, totalInterest, principal, schedule };
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Mortgage Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate monthly payments and view amortization schedules.</p>

        <AdBanner slot="mortgage-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Home Price ($)</label>
                  <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Down Payment ($)</label>
                  <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted mb-1 block">Interest Rate (%)</label>
                    <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-muted mb-1 block">Loan Term (years)</label>
                    <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary">
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                      <option value="25">25 years</option>
                      <option value="30">30 years</option>
                    </select>
                  </div>
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
                      <p className="font-bold font-mono">${results.principal.toLocaleString()}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Interest</p>
                      <p className="font-bold font-mono text-red-500">${Math.round(results.totalInterest).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                    <p className="text-xs text-muted">Total Cost of Loan</p>
                    <p className="font-bold font-mono">${Math.round(results.totalPaid).toLocaleString()}</p>
                  </div>

                  {/* Principal vs Interest bar */}
                  <div className="mt-2">
                    <div className="flex rounded-full overflow-hidden h-3">
                      <div className="bg-primary" style={{ width: `${(results.principal / results.totalPaid) * 100}%` }} />
                      <div className="bg-red-400" style={{ width: `${(results.totalInterest / results.totalPaid) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>Principal ({((results.principal / results.totalPaid) * 100).toFixed(0)}%)</span>
                      <span>Interest ({((results.totalInterest / results.totalPaid) * 100).toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Amortization */}
          <div className="w-full max-w-lg mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Amortization Schedule</h3>
                  <button onClick={() => setShowAmortization(!showAmortization)} className="text-sm text-primary hover:underline">
                    {showAmortization ? "Hide" : "Show"}
                  </button>
                </div>
                {showAmortization && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-card-border">
                          <th className="text-left py-2">Month</th>
                          <th className="text-right py-2">Payment</th>
                          <th className="text-right py-2">Principal</th>
                          <th className="text-right py-2">Interest</th>
                          <th className="text-right py-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.schedule.map((row) => (
                          <tr key={row.month} className="border-b border-card-border">
                            <td className="py-1.5">{row.month}</td>
                            <td className="text-right font-mono">${row.payment.toFixed(2)}</td>
                            <td className="text-right font-mono">${row.principal.toFixed(2)}</td>
                            <td className="text-right font-mono">${row.interest.toFixed(2)}</td>
                            <td className="text-right font-mono">${Math.round(row.balance).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            <AdBanner slot="mortgage-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Mortgage Payments Work</h2>
          <p className="text-muted">
            A mortgage payment consists of principal (the loan amount) and interest. Early in the loan,
            most of your payment goes toward interest. Over time, a larger portion goes toward paying down
            the principal. The formula used is: M = P[r(1+r)^n] / [(1+r)^n - 1], where M is monthly payment,
            P is principal, r is monthly interest rate, and n is total number of payments.
          </p>
        </section>
      </div>
    </div>
  );
}
