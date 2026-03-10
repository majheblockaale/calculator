"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function InterestRateCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const results = useMemo(() => {
    const P = parseFloat(loanAmount);
    const M = parseFloat(monthlyPayment);
    const years = parseFloat(loanTerm);

    if (isNaN(P) || P <= 0 || isNaN(M) || M <= 0 || isNaN(years) || years <= 0) return null;

    const n = years * 12;
    if (M * n <= P) return null; // payment too low to cover principal

    // Newton's method to find monthly rate
    let r = 0.005; // initial guess: 0.5% monthly = 6% annual
    for (let i = 0; i < 100; i++) {
      const pow = Math.pow(1 + r, n);
      const f = P * r * pow / (pow - 1) - M;
      const fpow = Math.pow(1 + r, n - 1);
      const df = P * (pow * (1 + r * n) - n * r * (1 + r) * fpow) / ((pow - 1) * (pow - 1))
        - P * r * pow / ((pow - 1) * (pow - 1)) * n * fpow;
      // Simpler derivative approach
      const h = 0.0000001;
      const pow2 = Math.pow(1 + r + h, n);
      const f2 = P * (r + h) * pow2 / (pow2 - 1) - M;
      const derivative = (f2 - f) / h;

      if (Math.abs(derivative) < 1e-15) break;
      const rNew = r - f / derivative;
      if (Math.abs(rNew - r) < 1e-10) {
        r = rNew;
        break;
      }
      r = Math.max(rNew, 1e-10); // keep rate positive
    }

    const annualRate = r * 12 * 100;
    const totalPaid = M * n;
    const totalInterest = totalPaid - P;

    // Build a small amortization summary
    const schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];
    let balance = P;
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let i = 1; i <= n; i++) {
      const intPayment = balance * r;
      const prinPayment = M - intPayment;
      balance = Math.max(0, balance - prinPayment);
      yearPrincipal += prinPayment;
      yearInterest += intPayment;

      if (i % 12 === 0 || i === n) {
        schedule.push({
          year: Math.ceil(i / 12),
          principalPaid: yearPrincipal,
          interestPaid: yearInterest,
          balance,
        });
        yearPrincipal = 0;
        yearInterest = 0;
      }
    }

    return { annualRate, monthlyRate: r * 100, totalPaid, totalInterest, schedule };
  }, [loanAmount, monthlyPayment, loanTerm]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Interest Rate Calculator</h1>
        <p className="text-muted text-center mb-8">Determine the interest rate on a loan from its payment details.</p>

        <AdBanner slot="interest-rate-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Loan Amount ($)</label>
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="25,000" />
              </div>

              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Monthly Payment ($)</label>
                <input type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="500" />
              </div>

              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Loan Term (Years)</label>
                <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="5" />
              </div>

              {results && (
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Annual Interest Rate (APR)</p>
                    <p className="text-4xl font-bold font-mono text-primary">{results.annualRate.toFixed(3)}%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Monthly Rate</p>
                      <p className="font-bold font-mono">{results.monthlyRate.toFixed(4)}%</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Interest</p>
                      <p className="font-bold font-mono text-red-500">${fmt(results.totalInterest)}</p>
                    </div>
                  </div>
                  <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                    <p className="text-xs text-muted">Total Amount Paid</p>
                    <p className="font-bold font-mono">${fmt(results.totalPaid)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Yearly Breakdown</h3>
                <div className="bg-display-bg border border-display-border rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                  <table className="w-full text-sm font-mono">
                    <thead className="sticky top-0 bg-display-bg">
                      <tr className="border-b border-display-border text-muted">
                        <th className="text-left px-3 py-2">Year</th>
                        <th className="text-right px-3 py-2">Principal</th>
                        <th className="text-right px-3 py-2">Interest</th>
                        <th className="text-right px-3 py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.schedule.map((row) => (
                        <tr key={row.year} className="border-b border-display-border last:border-0">
                          <td className="px-3 py-2">{row.year}</td>
                          <td className="text-right px-3 py-2">${fmt(row.principalPaid)}</td>
                          <td className="text-right px-3 py-2">${fmt(row.interestPaid)}</td>
                          <td className="text-right px-3 py-2">${fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <AdBanner slot="interest-rate-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Interest Rate Is Calculated</h2>
          <p className="text-muted mb-4">
            This calculator uses Newton&apos;s method to solve for the interest rate in the standard
            loan payment formula: M = P[r(1+r)^n] / [(1+r)^n - 1]. Given the loan amount, monthly
            payment, and term, it iteratively finds the rate that satisfies the equation.
          </p>
          <p className="text-muted">
            Knowing the true interest rate helps you compare loan offers, understand the real cost
            of financing, and make informed decisions about refinancing. The APR (Annual Percentage Rate)
            shown is the nominal rate — the actual cost may be higher when fees and compounding are included.
          </p>
        </section>
      </div>
    </div>
  );
}
