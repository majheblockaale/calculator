"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [lifeExpectancy, setLifeExpectancy] = useState("90");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("1000");
  const [preReturnRate, setPreReturnRate] = useState("7");
  const [postReturnRate, setPostReturnRate] = useState("4");
  const [desiredIncome, setDesiredIncome] = useState("60000");
  const [inflationRate, setInflationRate] = useState("3");

  const results = useMemo(() => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const life = parseInt(lifeExpectancy);
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const preRate = (parseFloat(preReturnRate) || 0) / 100 / 12;
    const postRate = (parseFloat(postReturnRate) || 0) / 100 / 12;
    const income = parseFloat(desiredIncome) || 0;
    const inflation = (parseFloat(inflationRate) || 0) / 100;

    if (isNaN(age) || isNaN(retAge) || retAge <= age || isNaN(life) || life <= retAge) return null;

    const yearsToRetire = retAge - age;
    const retirementYears = life - retAge;

    // Accumulation phase
    let balance = savings;
    const accumulation: { age: number; balance: number }[] = [];
    for (let m = 0; m < yearsToRetire * 12; m++) {
      balance = balance * (1 + preRate) + monthly;
      if ((m + 1) % 12 === 0) {
        accumulation.push({ age: age + (m + 1) / 12, balance });
      }
    }
    const retirementBalance = balance;

    // Inflation-adjusted income needed at retirement
    const adjustedIncome = income * Math.pow(1 + inflation, yearsToRetire);
    const monthlyWithdrawal = adjustedIncome / 12;

    // Distribution phase
    let distBalance = retirementBalance;
    const distribution: { age: number; balance: number; withdrawal: number }[] = [];
    let annualWithdrawal = adjustedIncome;
    let depletedAge = 0;

    for (let y = 0; y < retirementYears; y++) {
      const yearlyW = annualWithdrawal;
      for (let m = 0; m < 12; m++) {
        distBalance = distBalance * (1 + postRate) - yearlyW / 12;
      }
      distribution.push({ age: retAge + y + 1, balance: Math.max(0, distBalance), withdrawal: yearlyW });
      if (distBalance <= 0 && depletedAge === 0) {
        depletedAge = retAge + y + 1;
      }
      annualWithdrawal *= 1 + inflation;
    }

    const willLastUntil = depletedAge > 0 ? depletedAge : life;
    const moneyLasts = depletedAge === 0;

    return {
      retirementBalance,
      adjustedIncome,
      monthlyWithdrawal,
      willLastUntil,
      moneyLasts,
      accumulation,
      distribution,
    };
  }, [currentAge, retirementAge, lifeExpectancy, currentSavings, monthlyContribution, preReturnRate, postReturnRate, desiredIncome, inflationRate]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Retirement Calculator</h1>
        <p className="text-muted text-center mb-8">Plan your retirement savings and income needs.</p>

        <AdBanner slot="retirement-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="text-xs text-muted mb-1 block">Current Age</label>
                  <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Retire At</label>
                  <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Life Expect.</label>
                  <input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-muted mb-1 block">Current Savings ($)</label>
                  <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Monthly Saving ($)</label>
                  <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-muted mb-1 block">Pre-Retire Return (%)</label>
                  <input type="number" step="0.5" value={preReturnRate} onChange={(e) => setPreReturnRate(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Post-Retire Return (%)</label>
                  <input type="number" step="0.5" value={postReturnRate} onChange={(e) => setPostReturnRate(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs text-muted mb-1 block">Desired Income ($/yr)</label>
                  <input type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Inflation (%)</label>
                  <input type="number" step="0.5" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary" />
                </div>
              </div>

              {results && (
                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted mb-1">Savings at Retirement</p>
                    <p className="text-3xl font-bold font-mono text-primary">${fmt(results.retirementBalance)}</p>
                  </div>
                  <div className={`${results.moneyLasts ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"} border rounded-xl p-4 text-center`}>
                    <p className="text-sm text-muted mb-1">
                      {results.moneyLasts ? "Money lasts through life expectancy" : "Money runs out at age"}
                    </p>
                    <p className={`text-2xl font-bold font-mono ${results.moneyLasts ? "text-green-400" : "text-red-500"}`}>
                      {results.moneyLasts ? "You're on track!" : `Age ${results.willLastUntil}`}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Income Needed (adj.)</p>
                      <p className="font-bold font-mono text-sm">${fmt(results.adjustedIncome)}/yr</p>
                    </div>
                    <div className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">Monthly Withdrawal</p>
                      <p className="font-bold font-mono text-sm">${fmt(results.monthlyWithdrawal)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="retirement-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Planning for Retirement</h2>
          <p className="text-muted mb-4">
            This calculator models two phases: accumulation (saving and growing your money before retirement)
            and distribution (withdrawing during retirement). It accounts for inflation, which increases your
            income needs over time, and uses different return rates for pre- and post-retirement investing.
          </p>
          <p className="text-muted">
            The key to a secure retirement is starting early and contributing consistently. Even modest
            increases in monthly savings can dramatically improve outcomes over 20-30 years due to
            compound growth.
          </p>
        </section>
      </div>
    </div>
  );
}
