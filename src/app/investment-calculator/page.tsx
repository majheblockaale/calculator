"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

export default function InvestmentCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [investmentPeriod, setInvestmentPeriod] = useState("20");

  const results = useMemo(() => {
    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyContribution);
    const annualRate = parseFloat(annualReturn) / 100;
    const years = parseFloat(investmentPeriod);

    if (isNaN(initial) || isNaN(monthly) || isNaN(annualRate) || isNaN(years) || initial < 0 || years <= 0) {
      return null;
    }

    const monthlyRate = annualRate / 12;
    const totalMonths = years * 12;

    // Year-by-year schedule
    const yearlySchedule: {
      year: number;
      contributions: number;
      interestEarned: number;
      balance: number;
    }[] = [];

    let balance = initial;
    let totalContributions = initial;
    let totalInterest = 0;

    for (let year = 1; year <= years; year++) {
      const startBalance = balance;
      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        balance += interest + monthly;
        totalInterest += interest;
        totalContributions += monthly;
      }
      yearlySchedule.push({
        year,
        contributions: totalContributions,
        interestEarned: totalInterest,
        balance,
      });
    }

    return {
      finalValue: balance,
      totalContributions,
      totalInterest,
      yearlySchedule,
    };
  }, [initialInvestment, monthlyContribution, annualReturn, investmentPeriod]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Investment Calculator</h1>
        <p className="text-muted text-center mb-8">Project your investment growth with compound interest and regular contributions.</p>

        <AdBanner slot="investment-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Initial Investment ($)</label>
                  <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Monthly Contribution ($)</label>
                  <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted mb-1 block">Annual Return (%)</label>
                    <input type="number" step="0.1" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-muted mb-1 block">Period (years)</label>
                    <input type="number" value={investmentPeriod} onChange={(e) => setInvestmentPeriod(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              {results && (
                <div className="mt-6 space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Final Value</p>
                    <p className="text-4xl font-bold font-mono text-primary">${Math.round(results.finalValue).toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Contributions</p>
                      <p className="font-bold font-mono">${Math.round(results.totalContributions).toLocaleString()}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Total Interest Earned</p>
                      <p className="font-bold font-mono text-green-500">${Math.round(results.totalInterest).toLocaleString()}</p>
                    </div>
                  </div>
                  {/* Contributions vs Interest bar */}
                  <div className="mt-2">
                    <div className="flex rounded-full overflow-hidden h-3">
                      <div className="bg-primary" style={{ width: `${(results.totalContributions / results.finalValue) * 100}%` }} />
                      <div className="bg-green-400" style={{ width: `${(results.totalInterest / results.finalValue) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>Contributions ({((results.totalContributions / results.finalValue) * 100).toFixed(0)}%)</span>
                      <span>Interest ({((results.totalInterest / results.finalValue) * 100).toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Year-by-year table */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Year-by-Year Growth</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-card-border">
                        <th className="text-left py-2">Year</th>
                        <th className="text-right py-2">Contributions</th>
                        <th className="text-right py-2">Interest Earned</th>
                        <th className="text-right py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.yearlySchedule.map((row) => (
                        <tr key={row.year} className="border-b border-card-border">
                          <td className="py-1.5">{row.year}</td>
                          <td className="text-right font-mono">${Math.round(row.contributions).toLocaleString()}</td>
                          <td className="text-right font-mono text-green-500">${Math.round(row.interestEarned).toLocaleString()}</td>
                          <td className="text-right font-mono">${Math.round(row.balance).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <AdBanner slot="investment-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Compound Interest Works</h2>
          <p className="text-muted">
            Compound interest is interest earned on both the initial principal and the accumulated interest from
            previous periods. This creates an exponential growth effect over time, often called the &quot;snowball effect.&quot;
            The earlier you start investing and the more consistently you contribute, the more powerful compounding
            becomes. Even modest monthly contributions can grow into substantial wealth over decades thanks to
            compound returns.
          </p>
        </section>
      </div>
    </div>
  );
}
