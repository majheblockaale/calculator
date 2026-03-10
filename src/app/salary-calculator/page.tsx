"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

type PayPeriod = "hourly" | "weekly" | "biweekly" | "monthly" | "annual";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function SalaryCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [payPeriod, setPayPeriod] = useState<PayPeriod>("annual");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const results = useMemo(() => {
    const amt = parseFloat(amount);
    const hpw = parseFloat(hoursPerWeek) || 40;
    const wpy = parseFloat(weeksPerYear) || 52;

    if (isNaN(amt) || amt <= 0) return null;

    let annual: number;
    switch (payPeriod) {
      case "hourly":
        annual = amt * hpw * wpy;
        break;
      case "weekly":
        annual = amt * wpy;
        break;
      case "biweekly":
        annual = amt * (wpy / 2);
        break;
      case "monthly":
        annual = amt * 12;
        break;
      case "annual":
      default:
        annual = amt;
        break;
    }

    const hourly = annual / (hpw * wpy);
    const daily = hourly * (hpw / 5);
    const weekly = annual / wpy;
    const biweekly = annual / (wpy / 2);
    const semiMonthly = annual / 24;
    const monthly = annual / 12;
    const quarterly = annual / 4;

    return { hourly, daily, weekly, biweekly, semiMonthly, monthly, quarterly, annual };
  }, [amount, payPeriod, hoursPerWeek, weeksPerYear]);

  const rows = results
    ? [
        { label: "Hourly", value: results.hourly },
        { label: "Daily", value: results.daily },
        { label: "Weekly", value: results.weekly },
        { label: "Biweekly", value: results.biweekly },
        { label: "Semi-Monthly", value: results.semiMonthly },
        { label: "Monthly", value: results.monthly },
        { label: "Quarterly", value: results.quarterly },
        { label: "Annual", value: results.annual },
      ]
    : [];

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Salary Calculator</h1>
        <p className="text-muted text-center mb-8">Convert your pay between different periods.</p>

        <AdBanner slot="salary-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Amount */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Pay Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="75,000"
                />
              </div>

              {/* Pay Period */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Pay Period</label>
                <select
                  value={payPeriod}
                  onChange={(e) => setPayPeriod(e.target.value as PayPeriod)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary"
                >
                  <option value="hourly">Hourly</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>

              {/* Hours per Week */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Hours per Week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary"
                  placeholder="40"
                />
              </div>

              {/* Weeks per Year */}
              <div className="mb-5">
                <label className="text-sm text-muted mb-1 block">Weeks per Year</label>
                <input
                  type="number"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary"
                  placeholder="52"
                />
              </div>

              {/* Results Table */}
              {results && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-muted mb-3">Equivalent Pay Rates</h3>
                  <div className="space-y-2">
                    {rows.map((row) => {
                      const isHighlight = row.label.toLowerCase() === payPeriod || (payPeriod === "annual" && row.label === "Annual");
                      return (
                        <div
                          key={row.label}
                          className={`flex justify-between items-center rounded-xl px-4 py-3 ${
                            isHighlight
                              ? "bg-primary/10 border border-primary/30"
                              : "bg-display-bg border border-display-border"
                          }`}
                        >
                          <span className={`text-sm ${isHighlight ? "font-medium" : "text-muted"}`}>{row.label}</span>
                          <span className={`text-lg font-bold font-mono ${isHighlight ? "text-primary" : ""}`}>
                            ${fmt(row.value)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="salary-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How to Convert Between Pay Periods</h2>
          <p className="text-muted mb-4">
            Converting between pay periods requires knowing your hours per week and weeks per year.
            An annual salary is divided by the number of pay periods to get each rate. For hourly
            conversion, the annual salary is divided by total working hours per year (hours per
            week multiplied by weeks per year). Adjusting weeks per year accounts for unpaid
            vacation or part-time schedules.
          </p>
        </section>
      </div>
    </div>
  );
}
