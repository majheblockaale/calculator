"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

export default function AmortizationCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("250000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [extraPayment, setExtraPayment] = useState("0");
  const [showFullTable, setShowFullTable] = useState(false);

  const results = useMemo(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;
    const extra = parseFloat(extraPayment) || 0;

    if (isNaN(principal) || isNaN(rate) || isNaN(months) || principal <= 0 || rate <= 0 || months <= 0) {
      return null;
    }

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

    // Schedule without extra payments
    let balanceNoExtra = principal;
    let totalInterestNoExtra = 0;
    for (let i = 1; i <= months; i++) {
      const interestPmt = balanceNoExtra * rate;
      totalInterestNoExtra += interestPmt;
      balanceNoExtra -= (monthlyPayment - interestPmt);
    }

    // Schedule with extra payments
    const schedule: {
      month: number;
      payment: number;
      principal: number;
      interest: number;
      extra: number;
      balance: number;
    }[] = [];
    let balance = principal;
    let totalInterestWithExtra = 0;
    let actualMonths = 0;

    for (let i = 1; i <= months && balance > 0; i++) {
      const interestPmt = balance * rate;
      let principalPmt = monthlyPayment - interestPmt;
      let extraThisMonth = extra;

      // Ensure we don't overpay
      if (principalPmt + extraThisMonth > balance) {
        const totalPrincipal = balance;
        extraThisMonth = Math.max(0, totalPrincipal - principalPmt);
        principalPmt = totalPrincipal - extraThisMonth;
      }

      balance -= (principalPmt + extraThisMonth);
      totalInterestWithExtra += interestPmt;
      actualMonths = i;

      schedule.push({
        month: i,
        payment: interestPmt + principalPmt + extraThisMonth,
        principal: principalPmt,
        interest: interestPmt,
        extra: extraThisMonth,
        balance: Math.max(0, balance),
      });
    }

    const interestSaved = totalInterestNoExtra - totalInterestWithExtra;
    const monthsSaved = months - actualMonths;

    return {
      monthlyPayment,
      totalInterestNoExtra,
      totalInterestWithExtra,
      interestSaved,
      monthsSaved,
      actualMonths,
      schedule,
    };
  }, [loanAmount, interestRate, loanTerm, extraPayment]);

  const displaySchedule = useMemo(() => {
    if (!results) return [];
    if (showFullTable) return results.schedule;
    // Show first 12 months and every 12th month after that, plus last month
    return results.schedule.filter(
      (row, _idx, arr) => row.month <= 12 || row.month % 12 === 0 || row.month === arr[arr.length - 1].month
    );
  }, [results, showFullTable]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Amortization Calculator</h1>
        <p className="text-muted text-center mb-8">View your full loan schedule and see how extra payments save you money.</p>

        <AdBanner slot="amortization-top" format="horizontal" className="mb-8" />

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
                  <label className="text-sm text-muted mb-1 block">Extra Monthly Payment ($)</label>
                  <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              {results && (
                <div className="mt-6 space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Monthly Payment</p>
                    <p className="text-4xl font-bold font-mono text-primary">${results.monthlyPayment.toFixed(2)}</p>
                    {parseFloat(extraPayment) > 0 && (
                      <p className="text-xs text-muted mt-1">+ ${parseFloat(extraPayment).toFixed(2)} extra</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Interest (Original)</p>
                      <p className="font-bold font-mono text-red-500">${Math.round(results.totalInterestNoExtra).toLocaleString()}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Interest (With Extra)</p>
                      <p className="font-bold font-mono text-green-500">${Math.round(results.totalInterestWithExtra).toLocaleString()}</p>
                    </div>
                  </div>
                  {results.interestSaved > 0 && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Interest Saved</p>
                      <p className="font-bold font-mono text-green-500">${Math.round(results.interestSaved).toLocaleString()}</p>
                      <p className="text-xs text-muted mt-1">
                        Payoff {Math.floor(results.monthsSaved / 12)} years, {Math.round(results.monthsSaved % 12)} months sooner
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Amortization Table */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Amortization Schedule</h3>
                  <button onClick={() => setShowFullTable(!showFullTable)} className="text-sm text-primary hover:underline">
                    {showFullTable ? "Show Summary" : "Show All Months"}
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-card-border">
                        <th className="text-left py-2">Month</th>
                        <th className="text-right py-2">Payment</th>
                        <th className="text-right py-2">Principal</th>
                        <th className="text-right py-2">Interest</th>
                        <th className="text-right py-2">Extra</th>
                        <th className="text-right py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displaySchedule.map((row) => (
                        <tr key={row.month} className="border-b border-card-border">
                          <td className="py-1.5">{row.month}</td>
                          <td className="text-right font-mono">${row.payment.toFixed(2)}</td>
                          <td className="text-right font-mono">${row.principal.toFixed(2)}</td>
                          <td className="text-right font-mono">${row.interest.toFixed(2)}</td>
                          <td className="text-right font-mono">${row.extra.toFixed(2)}</td>
                          <td className="text-right font-mono">${Math.round(row.balance).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <AdBanner slot="amortization-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Understanding Amortization</h2>
          <p className="text-muted">
            Amortization is the process of spreading a loan into a series of fixed payments over time. Each payment
            covers interest charges and reduces the principal balance. Early payments are interest-heavy, while later
            payments apply more toward the principal. Making extra payments directly reduces principal, which lowers
            future interest charges and can shorten your loan term significantly. Even small extra payments can save
            thousands in interest over the life of a loan.
          </p>
        </section>
      </div>
    </div>
  );
}
