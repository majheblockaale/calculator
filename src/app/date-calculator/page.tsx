"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

function daysBetween(a: Date, b: Date): number {
  const diff = b.getTime() - a.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export default function DateCalculatorPage() {
  const today = toDateStr(new Date());
  const [date1, setDate1] = useState(today);
  const [date2, setDate2] = useState(today);

  const [addDate, setAddDate] = useState(today);
  const [addDays, setAddDays] = useState("30");
  const [addOp, setAddOp] = useState<"add" | "subtract">("add");

  const diff = useMemo(() => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const totalDays = daysBetween(d1, d2);
    const absDays = Math.abs(totalDays);
    const weeks = Math.floor(absDays / 7);
    const remainDays = absDays % 7;
    const months = Math.abs((d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth()));
    const years = Math.floor(months / 12);
    const remainMonths = months % 12;
    return { totalDays, absDays, weeks, remainDays, months, years, remainMonths };
  }, [date1, date2]);

  const resultDate = useMemo(() => {
    const d = new Date(addDate);
    const days = parseInt(addDays);
    if (isNaN(d.getTime()) || isNaN(days)) return null;
    const ms = days * 24 * 60 * 60 * 1000;
    const result = new Date(d.getTime() + (addOp === "add" ? ms : -ms));
    return result;
  }, [addDate, addDays, addOp]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Date Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate days between dates or add/subtract days.</p>

        <AdBanner slot="date-top" format="horizontal" className="mb-8" />

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Days between dates */}
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Days Between Two Dates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-muted mb-1 block">Start Date</label>
                <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm text-muted mb-1 block">End Date</label>
                <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
              </div>
            </div>
            {diff && (
              <div className="bg-display-bg border border-display-border rounded-xl p-4">
                <div className="text-center mb-3">
                  <span className="text-4xl font-bold font-mono text-primary">{diff.absDays}</span>
                  <span className="text-muted ml-2">days</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-center">
                  <div>
                    <p className="text-muted">Weeks + Days</p>
                    <p className="font-semibold">{diff.weeks} weeks, {diff.remainDays} days</p>
                  </div>
                  <div>
                    <p className="text-muted">Years + Months</p>
                    <p className="font-semibold">{diff.years} years, {diff.remainMonths} months</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Add/subtract days */}
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add or Subtract Days</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-1 block">Start Date</label>
                <input type="date" value={addDate} onChange={(e) => setAddDate(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
              </div>
              <div className="flex gap-3 items-end">
                <div className="flex gap-2">
                  <button onClick={() => setAddOp("add")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${addOp === "add" ? "bg-green-500 text-white" : "bg-btn-bg hover:bg-btn-hover"}`}>
                    + Add
                  </button>
                  <button onClick={() => setAddOp("subtract")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${addOp === "subtract" ? "bg-red-500 text-white" : "bg-btn-bg hover:bg-btn-hover"}`}>
                    − Subtract
                  </button>
                </div>
                <div className="flex-1">
                  <input type="number" value={addDays} onChange={(e) => setAddDays(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-primary" placeholder="Days" />
                </div>
              </div>
              {resultDate && (
                <div className="bg-display-bg border border-display-border rounded-xl p-4 text-center">
                  <p className="text-sm text-muted mb-1">Result Date</p>
                  <p className="text-2xl font-bold">{resultDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Date Calculator</h2>
          <p className="text-muted">
            Use this date calculator to find the number of days, weeks, months, and years between two dates,
            or to add and subtract days from any date to find a future or past date.
          </p>
        </section>
      </div>
    </div>
  );
}
