"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type CalcMode = "loan" | "savings" | "investment";

export default function FinanceCalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("loan");

  // Loan
  const [loanAmount, setLoanAmount] = useState("250000");
  const [loanRate, setLoanRate] = useState("6.5");
  const [loanYears, setLoanYears] = useState("30");

  // Savings
  const [savInitial, setSavInitial] = useState("5000");
  const [savMonthly, setSavMonthly] = useState("500");
  const [savRate, setSavRate] = useState("5");
  const [savYears, setSavYears] = useState("10");

  // Investment
  const [invInitial, setInvInitial] = useState("10000");
  const [invMonthly, setInvMonthly] = useState("200");
  const [invRate, setInvRate] = useState("8");
  const [invYears, setInvYears] = useState("20");

  const loanResults = useMemo(() => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(loanRate) / 100 / 12;
    const n = parseFloat(loanYears) * 12;
    if (isNaN(P) || P <= 0 || isNaN(r) || r <= 0 || isNaN(n) || n <= 0) return null;
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    return { monthly, totalPaid, totalInterest: totalPaid - P };
  }, [loanAmount, loanRate, loanYears]);

  const savingsResults = useMemo(() => {
    const P = parseFloat(savInitial) || 0;
    const PMT = parseFloat(savMonthly) || 0;
    const r = (parseFloat(savRate) || 0) / 100 / 12;
    const n = (parseFloat(savYears) || 0) * 12;
    if (n <= 0 || (P <= 0 && PMT <= 0)) return null;
    let bal = P;
    for (let i = 0; i < n; i++) bal = bal * (1 + r) + PMT;
    const totalContrib = P + PMT * n;
    return { finalBalance: bal, totalContrib, totalInterest: bal - totalContrib };
  }, [savInitial, savMonthly, savRate, savYears]);

  const investResults = useMemo(() => {
    const P = parseFloat(invInitial) || 0;
    const PMT = parseFloat(invMonthly) || 0;
    const r = (parseFloat(invRate) || 0) / 100 / 12;
    const n = (parseFloat(invYears) || 0) * 12;
    if (n <= 0 || (P <= 0 && PMT <= 0)) return null;
    let bal = P;
    for (let i = 0; i < n; i++) bal = bal * (1 + r) + PMT;
    const totalContrib = P + PMT * n;
    return { finalBalance: bal, totalContrib, totalGrowth: bal - totalContrib };
  }, [invInitial, invMonthly, invRate, invYears]);

  const modes: { key: CalcMode; label: string }[] = [
    { key: "loan", label: "Loan" },
    { key: "savings", label: "Savings" },
    { key: "investment", label: "Investment" },
  ];

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Finance Calculator</h1>
        <p className="text-muted text-center mb-8">All-in-one calculator for loans, savings, and investments.</p>

        <AdBanner slot="finance-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-2 mb-6">
                {modes.map((m) => (
                  <button key={m.key} onClick={() => setMode(m.key)}
                    className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                      mode === m.key ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}>
                    {m.label}
                  </button>
                ))}
              </div>

              {mode === "loan" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted mb-1 block">Loan Amount ($)</label>
                    <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted mb-1 block">Interest Rate (%)</label>
                      <input type="number" step="0.1" value={loanRate} onChange={(e) => setLoanRate(e.target.value)}
                        className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-sm text-muted mb-1 block">Term (Years)</label>
                      <input type="number" value={loanYears} onChange={(e) => setLoanYears(e.target.value)}
                        className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  {loanResults && (
                    <div className="space-y-3 mt-4">
                      <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                        <p className="text-sm text-muted mb-1">Monthly Payment</p>
                        <p className="text-3xl font-bold font-mono text-primary">${fmt(loanResults.monthly)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                          <p className="text-xs text-muted">Total Interest</p>
                          <p className="font-bold font-mono text-red-500">${fmt(loanResults.totalInterest)}</p>
                        </div>
                        <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                          <p className="text-xs text-muted">Total Paid</p>
                          <p className="font-bold font-mono">${fmt(loanResults.totalPaid)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mode === "savings" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted mb-1 block">Initial Deposit ($)</label>
                    <input type="number" value={savInitial} onChange={(e) => setSavInitial(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-muted mb-1 block">Monthly Contribution ($)</label>
                    <input type="number" value={savMonthly} onChange={(e) => setSavMonthly(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted mb-1 block">Annual Rate (%)</label>
                      <input type="number" step="0.1" value={savRate} onChange={(e) => setSavRate(e.target.value)}
                        className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-sm text-muted mb-1 block">Years</label>
                      <input type="number" value={savYears} onChange={(e) => setSavYears(e.target.value)}
                        className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  {savingsResults && (
                    <div className="space-y-3 mt-4">
                      <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                        <p className="text-sm text-muted mb-1">Final Balance</p>
                        <p className="text-3xl font-bold font-mono text-primary">${fmt(savingsResults.finalBalance)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                          <p className="text-xs text-muted">Total Contributions</p>
                          <p className="font-bold font-mono">${fmt(savingsResults.totalContrib)}</p>
                        </div>
                        <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                          <p className="text-xs text-muted">Interest Earned</p>
                          <p className="font-bold font-mono text-green-400">${fmt(savingsResults.totalInterest)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mode === "investment" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted mb-1 block">Initial Investment ($)</label>
                    <input type="number" value={invInitial} onChange={(e) => setInvInitial(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-muted mb-1 block">Monthly Contribution ($)</label>
                    <input type="number" value={invMonthly} onChange={(e) => setInvMonthly(e.target.value)}
                      className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted mb-1 block">Expected Return (%)</label>
                      <input type="number" step="0.5" value={invRate} onChange={(e) => setInvRate(e.target.value)}
                        className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-sm text-muted mb-1 block">Years</label>
                      <input type="number" value={invYears} onChange={(e) => setInvYears(e.target.value)}
                        className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  {investResults && (
                    <div className="space-y-3 mt-4">
                      <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                        <p className="text-sm text-muted mb-1">Future Value</p>
                        <p className="text-3xl font-bold font-mono text-primary">${fmt(investResults.finalBalance)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                          <p className="text-xs text-muted">Total Contributed</p>
                          <p className="font-bold font-mono">${fmt(investResults.totalContrib)}</p>
                        </div>
                        <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                          <p className="text-xs text-muted">Investment Growth</p>
                          <p className="font-bold font-mono text-green-400">${fmt(investResults.totalGrowth)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="finance-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">All-in-One Finance Calculator</h2>
          <p className="text-muted">
            This calculator covers the three most common personal finance scenarios: loan repayment,
            savings growth, and investment projections. Each uses time-value-of-money principles to
            show how your money grows or costs over time. Switch between modes to compare different
            financial strategies side by side.
          </p>
        </section>
      </div>
    </div>
  );
}
