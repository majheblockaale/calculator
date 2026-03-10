"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function MutualFundCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlySIP, setMonthlySIP] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [expenseRatio, setExpenseRatio] = useState("");
  const [investmentPeriod, setInvestmentPeriod] = useState("");

  const results = useMemo(() => {
    const initial = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlySIP) || 0;
    const annualReturn = parseFloat(expectedReturn);
    const expense = parseFloat(expenseRatio) || 0;
    const periodYears = parseFloat(investmentPeriod);

    if (isNaN(annualReturn) || isNaN(periodYears) || periodYears <= 0 || (initial <= 0 && monthly <= 0)) {
      return null;
    }

    const totalMonths = Math.round(periodYears * 12);
    const totalInvested = initial + monthly * totalMonths;

    // Without expense ratio
    const monthlyRate = annualReturn / 100 / 12;
    let fvWithout = initial * Math.pow(1 + monthlyRate, totalMonths);
    if (monthly > 0 && monthlyRate > 0) {
      fvWithout += monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    } else if (monthly > 0) {
      fvWithout += monthly * totalMonths;
    }

    // With expense ratio
    const netReturn = annualReturn - expense;
    const monthlyNetRate = netReturn / 100 / 12;
    let fvWith = initial * Math.pow(1 + monthlyNetRate, totalMonths);
    if (monthly > 0 && monthlyNetRate > 0) {
      fvWith += monthly * ((Math.pow(1 + monthlyNetRate, totalMonths) - 1) / monthlyNetRate) * (1 + monthlyNetRate);
    } else if (monthly > 0) {
      fvWith += monthly * totalMonths;
    }

    const totalReturnsWithout = fvWithout - totalInvested;
    const totalReturnsWith = fvWith - totalInvested;
    const expenseImpact = fvWithout - fvWith;

    return {
      futureValue: fvWith,
      futureValueWithout: fvWithout,
      totalInvested,
      totalReturns: totalReturnsWith,
      totalReturnsWithout,
      expenseImpact,
      effectiveReturn: netReturn,
    };
  }, [initialInvestment, monthlySIP, expectedReturn, expenseRatio, investmentPeriod]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Mutual Fund Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate SIP and lump sum returns with expense ratio impact.</p>

        <AdBanner slot="mutual-fund-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Initial investment */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Initial Investment ($)</label>
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="10,000"
                  min="0"
                />
              </div>

              {/* Monthly SIP */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Monthly SIP ($)</label>
                <input
                  type="number"
                  value={monthlySIP}
                  onChange={(e) => setMonthlySIP(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="500"
                  min="0"
                />
              </div>

              {/* Expected return rate */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Expected Annual Return (%)</label>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="12"
                  min="0"
                  step="0.1"
                />
              </div>

              {/* Expense ratio */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Expense Ratio (%)</label>
                <input
                  type="number"
                  value={expenseRatio}
                  onChange={(e) => setExpenseRatio(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="0.5"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Investment period */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Investment Period (years)</label>
                <input
                  type="number"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="10"
                  min="1"
                  step="1"
                />
              </div>

              {/* Results */}
              {results && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">Future Value</span>
                    <span className="text-2xl font-bold font-mono text-primary">${fmt(results.futureValue)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Total Invested</span>
                    <span className="text-xl font-bold font-mono">${fmt(results.totalInvested)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Total Returns</span>
                    <span className="text-xl font-bold font-mono text-green-500">${fmt(results.totalReturns)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Effective Return Rate</span>
                    <span className="text-lg font-bold font-mono">{results.effectiveReturn.toFixed(2)}%</span>
                  </div>

                  {/* Expense ratio impact */}
                  <div className="mt-4 pt-4 border-t border-card-border">
                    <h3 className="text-sm font-semibold text-muted mb-3">Expense Ratio Impact</h3>
                    <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3 mb-2">
                      <span className="text-sm text-muted">Value Without Expenses</span>
                      <span className="text-lg font-bold font-mono">${fmt(results.futureValueWithout)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                      <span className="text-sm text-muted">Cost of Expense Ratio</span>
                      <span className="text-lg font-bold font-mono text-red-500">-${fmt(results.expenseImpact)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="mutual-fund-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Understanding Mutual Fund Returns</h2>
          <p className="text-muted mb-4">
            Mutual funds pool money from many investors to purchase a diversified portfolio of stocks,
            bonds, or other securities. Returns are generated through capital gains, dividends, and
            interest income. A Systematic Investment Plan (SIP) allows you to invest a fixed amount
            regularly, benefiting from dollar-cost averaging.
          </p>
          <p className="text-muted mb-4">
            The expense ratio is an annual fee charged by the fund as a percentage of your investment.
            While it may seem small, even a 0.5% difference compounds significantly over time. For
            example, on a $100,000 portfolio over 20 years, a 1% expense ratio versus 0.5% can cost
            you tens of thousands of dollars in lost returns.
          </p>
          <p className="text-muted">
            When selecting mutual funds, consider the expense ratio alongside historical performance,
            fund manager track record, and the fund&apos;s investment strategy. Index funds typically
            have lower expense ratios compared to actively managed funds.
          </p>
        </section>
      </div>
    </div>
  );
}
