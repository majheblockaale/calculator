"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

type CompoundFreq = "daily" | "monthly" | "quarterly" | "yearly";

const freqMap: Record<CompoundFreq, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
};

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [frequency, setFrequency] = useState<CompoundFreq>("monthly");
  const [years, setYears] = useState("");

  const results = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const n = freqMap[frequency];
    const t = parseFloat(years) || 0;

    if (t <= 0 || (P <= 0 && PMT <= 0)) return null;

    const yearlyBreakdown: { year: number; balance: number; contributions: number; interest: number }[] = [];

    let balance = P;
    let totalContributions = P;
    const periodsPerYear = n;
    const ratePerPeriod = r / n;
    // contributions per compounding period
    const contributionsPerPeriod = PMT * 12 / n;

    for (let y = 1; y <= t; y++) {
      for (let p = 0; p < periodsPerYear; p++) {
        balance = balance * (1 + ratePerPeriod) + contributionsPerPeriod;
      }
      totalContributions += PMT * 12;
      const totalInterest = balance - totalContributions;
      yearlyBreakdown.push({
        year: y,
        balance,
        contributions: totalContributions,
        interest: totalInterest,
      });
    }

    const futureValue = balance;
    const totalInterest = futureValue - totalContributions;

    return { futureValue, totalContributions, totalInterest, yearlyBreakdown };
  }, [principal, monthlyContribution, annualRate, frequency, years]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Compound Interest Calculator</h1>
        <p className="text-muted text-center mb-8">See how your investments grow over time.</p>

        <AdBanner slot="compound-interest-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Principal */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Initial Investment ($)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="10,000"
                />
              </div>

              {/* Monthly Contribution */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Monthly Contribution ($)</label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="500"
                />
              </div>

              {/* Annual Interest Rate */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Annual Interest Rate (%)</label>
                <input
                  type="number"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="7"
                  step="0.1"
                />
              </div>

              {/* Compounding Frequency */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Compounding Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as CompoundFreq)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary"
                >
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              {/* Time Period */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Time Period (Years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="20"
                />
              </div>

              {/* Results */}
              {results && (
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">Future Value</span>
                    <span className="text-2xl font-bold font-mono text-primary">${fmt(results.futureValue)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Total Contributions</span>
                    <span className="text-lg font-bold font-mono">${fmt(results.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Total Interest Earned</span>
                    <span className="text-lg font-bold font-mono text-green-400">${fmt(results.totalInterest)}</span>
                  </div>

                  {/* Year-by-Year Breakdown */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-muted mb-3">Year-by-Year Breakdown</h3>
                    <div className="bg-display-bg border border-display-border rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                      <table className="w-full text-sm font-mono">
                        <thead className="sticky top-0 bg-display-bg">
                          <tr className="border-b border-display-border text-muted">
                            <th className="text-left px-3 py-2">Year</th>
                            <th className="text-right px-3 py-2">Contributions</th>
                            <th className="text-right px-3 py-2">Interest</th>
                            <th className="text-right px-3 py-2">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.yearlyBreakdown.map((row) => (
                            <tr key={row.year} className="border-b border-display-border last:border-0">
                              <td className="px-3 py-2">{row.year}</td>
                              <td className="text-right px-3 py-2">${fmt(row.contributions)}</td>
                              <td className="text-right px-3 py-2">${fmt(row.interest)}</td>
                              <td className="text-right px-3 py-2">${fmt(row.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="compound-interest-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Compound Interest Works</h2>
          <p className="text-muted mb-4">
            Compound interest is interest calculated on both the initial principal and the accumulated
            interest from previous periods. The more frequently interest is compounded, the faster
            your investment grows. Combined with regular contributions, compound interest creates
            exponential growth over time, making it one of the most powerful concepts in investing
            and personal finance.
          </p>
        </section>
      </div>
    </div>
  );
}
