"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");

  const result = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const now = new Date();
    if (isNaN(birth.getTime()) || birth > now) return null;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    // Next birthday
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= now) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, totalMinutes, daysUntilBirthday };
  }, [birthDate]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Age Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate your exact age from your date of birth.</p>

        <AdBanner slot="age-top" format="horizontal" className="mb-8" />

        <div className="max-w-lg mx-auto">
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <label className="text-sm text-muted mb-1 block">Date of Birth</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-primary" />
            </div>

            {result && (
              <div className="space-y-4">
                {/* Main age */}
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
                  <p className="text-sm text-muted mb-2">Your Age</p>
                  <div className="flex justify-center gap-6">
                    <div>
                      <p className="text-4xl font-bold text-primary">{result.years}</p>
                      <p className="text-xs text-muted">years</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-primary">{result.months}</p>
                      <p className="text-xs text-muted">months</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-primary">{result.days}</p>
                      <p className="text-xs text-muted">days</p>
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Total Days", value: result.totalDays.toLocaleString() },
                    { label: "Total Weeks", value: result.totalWeeks.toLocaleString() },
                    { label: "Total Months", value: result.totalMonths.toLocaleString() },
                    { label: "Total Hours", value: result.totalHours.toLocaleString() },
                    { label: "Total Minutes", value: result.totalMinutes.toLocaleString() },
                    { label: "Next Birthday", value: `${result.daysUntilBirthday} days` },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-display-bg border border-display-border rounded-xl p-3 text-center">
                      <p className="text-xs text-muted">{stat.label}</p>
                      <p className="font-bold font-mono text-sm">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Old Am I?</h2>
          <p className="text-muted">
            Enter your date of birth to find your exact age in years, months, days, and more.
            The calculator also shows how many days until your next birthday.
          </p>
        </section>
      </div>
    </div>
  );
}
