"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function FourOOneKCalculatorPage() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSalary, setCurrentSalary] = useState("75000");
  const [salaryIncrease, setSalaryIncrease] = useState("3");
  const [contributionPct, setContributionPct] = useState("10");
  const [employerMatchPct, setEmployerMatchPct] = useState("50");
  const [employerMatchLimit, setEmployerMatchLimit] = useState("6");
  const [currentBalance, setCurrentBalance] = useState("25000");
  const [annualReturn, setAnnualReturn] = useState("7");

  const results = useMemo(() => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const salary = parseFloat(currentSalary);
    const salGrowth = parseFloat(salaryIncrease) / 100;
    const contribPct = parseFloat(contributionPct) / 100;
    const matchPct = parseFloat(employerMatchPct) / 100;
    const matchLimit = parseFloat(employerMatchLimit) / 100;
    const balance0 = parseFloat(currentBalance) || 0;
    const returnRate = parseFloat(annualReturn) / 100;

    if (isNaN(age) || isNaN(retAge) || retAge <= age || isNaN(salary) || salary <= 0 || isNaN(returnRate)) {
      return null;
    }

    const years = retAge - age;
    const breakdown: { age: number; balance: number; contributions: number; employerMatch: number; growth: number }[] = [];

    let bal = balance0;
    let totalContributions = 0;
    let totalMatch = 0;
    let totalGrowth = 0;
    let sal = salary;

    for (let y = 1; y <= years; y++) {
      const yearContrib = sal * contribPct;
      const effectiveMatchPct = Math.min(contribPct, matchLimit);
      const yearMatch = sal * effectiveMatchPct * matchPct;
      const yearGrowth = (bal + yearContrib + yearMatch) * returnRate;

      bal = bal + yearContrib + yearMatch + yearGrowth;
      totalContributions += yearContrib;
      totalMatch += yearMatch;
      totalGrowth += yearGrowth;

      if (y <= 5 || y % 5 === 0 || y === years) {
        breakdown.push({
          age: age + y,
          balance: bal,
          contributions: totalContributions,
          employerMatch: totalMatch,
          growth: totalGrowth,
        });
      }

      sal *= 1 + salGrowth;
    }

    return { finalBalance: bal, totalContributions, totalMatch, totalGrowth, breakdown, years };
  }, [currentAge, retirementAge, currentSalary, salaryIncrease, contributionPct, employerMatchPct, employerMatchLimit, currentBalance, annualReturn]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">401K Calculator</h1>
        <p className="text-muted text-center mb-8">Project your retirement savings with employer match and investment growth.</p>

        <AdBanner slot="401k-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Current Age</label>
                  <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Retirement Age</label>
                  <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Annual Salary ($)</label>
                <input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Salary Increase (%/yr)</label>
                  <input type="number" step="0.5" value={salaryIncrease} onChange={(e) => setSalaryIncrease(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Your Contribution (%)</label>
                  <input type="number" step="1" value={contributionPct} onChange={(e) => setContributionPct(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Employer Match (%)</label>
                  <input type="number" step="10" value={employerMatchPct} onChange={(e) => setEmployerMatchPct(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Match Up To (%)</label>
                  <input type="number" step="1" value={employerMatchLimit} onChange={(e) => setEmployerMatchLimit(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">Current Balance ($)</label>
                  <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">Annual Return (%)</label>
                  <input type="number" step="0.5" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              {results && (
                <div className="space-y-3 mt-6">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Projected Balance at Retirement</p>
                    <p className="text-3xl font-bold font-mono text-primary">${fmt(results.finalBalance)}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Your Contributions</p>
                      <p className="font-bold font-mono text-sm">${fmt(results.totalContributions)}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Employer Match</p>
                      <p className="font-bold font-mono text-sm">${fmt(results.totalMatch)}</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Investment Growth</p>
                      <p className="font-bold font-mono text-sm text-green-400">${fmt(results.totalGrowth)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 space-y-6">
            {results && (
              <div className="bg-card-bg border border-card-border rounded-2xl p-4">
                <h3 className="font-semibold mb-3">Growth Over Time</h3>
                <div className="bg-display-bg border border-display-border rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                  <table className="w-full text-sm font-mono">
                    <thead className="sticky top-0 bg-display-bg">
                      <tr className="border-b border-display-border text-muted">
                        <th className="text-left px-3 py-2">Age</th>
                        <th className="text-right px-3 py-2">Contributions</th>
                        <th className="text-right px-3 py-2">Match</th>
                        <th className="text-right px-3 py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.breakdown.map((row) => (
                        <tr key={row.age} className="border-b border-display-border last:border-0">
                          <td className="px-3 py-2">{row.age}</td>
                          <td className="text-right px-3 py-2">${fmt(row.contributions)}</td>
                          <td className="text-right px-3 py-2">${fmt(row.employerMatch)}</td>
                          <td className="text-right px-3 py-2">${fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <AdBanner slot="401k-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Understanding Your 401(k)</h2>
          <p className="text-muted mb-4">
            A 401(k) is a tax-advantaged retirement savings plan offered by employers. You contribute a percentage
            of your pre-tax salary, which reduces your current taxable income. Many employers offer a matching
            contribution, essentially giving you free money toward retirement.
          </p>
          <p className="text-muted">
            The power of a 401(k) comes from compound growth over time. Even small increases in your contribution
            rate can make a significant difference over a 30+ year career. Maximizing your employer match is one
            of the most impactful financial decisions you can make.
          </p>
        </section>
      </div>
    </div>
  );
}
