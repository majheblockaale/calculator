"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("25000");
  const [interestRate, setInterestRate] = useState("7.5");
  const [loanTerm, setLoanTerm] = useState("5");
  const [startDate, setStartDate] = useState("");
  const [showAmortization, setShowAmortization] = useState(false);

  const results = useMemo(() => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      return null;
    }

    const r = annualRate / 100 / 12;
    const n = years * 12;
    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - P;

    // Amortization schedule
    const schedule: { month: number; date: string; payment: number; principal: number; interest: number; balance: number }[] = [];
    let balance = P;
    const start = startDate ? new Date(startDate) : null;

    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * r;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      let dateStr = "";
      if (start) {
        const d = new Date(start);
        d.setMonth(d.getMonth() + i);
        dateStr = d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
      }

      if (i <= 12 || i % 12 === 0 || i === n) {
        schedule.push({
          month: i,
          date: dateStr,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
        });
      }
    }

    return { monthlyPayment, totalPaid, totalInterest, schedule };
  }, [loanAmount, interestRate, loanTerm, startDate]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Loan Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate your loan repayment plan, monthly payments, and total interest cost.</p>

        <AdBanner slot="loan-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Loan Amount ($)</label>
                  <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
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
                    <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Start Date (optional)</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
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
                      <p className="text-xs text-muted">Total Interest</p>
                      <p className="font-bold font-mono text-red-500">${Math.round(results.totalInterest).toLocaleString()}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Amount Paid</p>
                      <p className="font-bold font-mono">${Math.round(results.totalPaid).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Principal vs Interest bar */}
                  <div className="mt-2">
                    <div className="flex rounded-full overflow-hidden h-3">
                      <div className="bg-primary" style={{ width: `${(parseFloat(loanAmount) / results.totalPaid) * 100}%` }} />
                      <div className="bg-red-400" style={{ width: `${(results.totalInterest / results.totalPaid) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>Principal ({((parseFloat(loanAmount) / results.totalPaid) * 100).toFixed(0)}%)</span>
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
                          {startDate && <th className="text-left py-2">Date</th>}
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
                            {startDate && <td className="py-1.5">{row.date}</td>}
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
            <AdBanner slot="loan-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Loan Repayment Works</h2>
          <p className="text-muted">
            Loan repayment is calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1],
            where M is the monthly payment, P is the loan principal, r is the monthly interest rate (annual rate divided
            by 12), and n is the total number of monthly payments. Each payment is split between interest and principal.
            Early in the loan, a larger portion of each payment goes toward interest. As the principal decreases over
            time, more of each payment is applied to the principal balance. The amortization schedule above shows
            how this breakdown changes over the life of the loan.
          </p>
        </section>
      </div>
    </div>
  );
}
