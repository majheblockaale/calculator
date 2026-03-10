"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function MortgagePayoffCalculatorPage() {
  const [balance, setBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [extraPayment, setExtraPayment] = useState("");

  const results = useMemo(() => {
    const bal = parseFloat(balance);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    const extra = parseFloat(extraPayment) || 0;

    if (isNaN(bal) || bal <= 0 || isNaN(rate) || rate <= 0 || isNaN(payment) || payment <= 0) return null;
    if (payment <= bal * rate) return null; // payment doesn't cover interest

    // Without extra payments
    let balNormal = bal;
    let monthsNormal = 0;
    let interestNormal = 0;
    while (balNormal > 0 && monthsNormal < 600) {
      const intPmt = balNormal * rate;
      interestNormal += intPmt;
      balNormal -= (payment - intPmt);
      monthsNormal++;
    }

    // With extra payments
    let balExtra = bal;
    let monthsExtra = 0;
    let interestExtra = 0;
    while (balExtra > 0 && monthsExtra < 600) {
      const intPmt = balExtra * rate;
      interestExtra += intPmt;
      balExtra -= (payment + extra - intPmt);
      monthsExtra++;
    }

    const interestSaved = interestNormal - interestExtra;
    const timeSaved = monthsNormal - monthsExtra;

    return {
      monthsNormal, monthsExtra,
      interestNormal, interestExtra, interestSaved,
      timeSavedYears: Math.floor(timeSaved / 12),
      timeSavedMonths: timeSaved % 12,
    };
  }, [balance, interestRate, monthlyPayment, extraPayment]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Mortgage Payoff Calculator</h1>
        <p className="text-muted text-center mb-8">See how extra payments accelerate your mortgage payoff.</p>

        <AdBanner slot="mortgage-payoff-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Remaining Balance ($)</label>
                <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="250,000" />
              </div>
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Interest Rate (%)</label>
                <input type="number" step="0.125" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="6.5" />
              </div>
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Current Monthly Payment ($)</label>
                <input type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="1,580" />
              </div>
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Extra Monthly Payment ($)</label>
                <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="300" />
              </div>

              {results && (
                <div className="space-y-3">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Interest Saved</p>
                    <p className="text-3xl font-bold font-mono text-green-400">${fmt(results.interestSaved)}</p>
                  </div>
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Time Saved</p>
                    <p className="text-2xl font-bold font-mono text-primary">
                      {results.timeSavedYears > 0 && `${results.timeSavedYears} yr `}{results.timeSavedMonths} mo
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Without Extra</p>
                      <p className="font-bold font-mono text-sm">{Math.floor(results.monthsNormal / 12)} yr {results.monthsNormal % 12} mo</p>
                      <p className="text-xs text-muted mt-1">${fmt(results.interestNormal)} interest</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">With Extra</p>
                      <p className="font-bold font-mono text-sm">{Math.floor(results.monthsExtra / 12)} yr {results.monthsExtra % 12} mo</p>
                      <p className="text-xs text-muted mt-1">${fmt(results.interestExtra)} interest</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="mortgage-payoff-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Why Extra Payments Matter</h2>
          <p className="text-muted">
            Extra mortgage payments go directly toward reducing your principal balance, which means
            less interest accrues each month. Even modest extra payments of $100-$300/month can shave
            years off your mortgage and save tens of thousands in interest. The earlier you start making
            extra payments, the greater the impact due to compound interest working in your favor.
          </p>
        </section>
      </div>
    </div>
  );
}
