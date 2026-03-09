"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";

type UnitSystem = "metric" | "imperial";

const bmiCategories = [
  { label: "Underweight", range: "< 18.5", color: "text-blue-500", min: 0, max: 18.5 },
  { label: "Normal weight", range: "18.5 – 24.9", color: "text-green-500", min: 18.5, max: 25 },
  { label: "Overweight", range: "25 – 29.9", color: "text-yellow-500", min: 25, max: 30 },
  { label: "Obese (Class I)", range: "30 – 34.9", color: "text-orange-500", min: 30, max: 35 },
  { label: "Obese (Class II)", range: "35 – 39.9", color: "text-red-400", min: 35, max: 40 },
  { label: "Obese (Class III)", range: "40+", color: "text-red-600", min: 40, max: Infinity },
];

export default function BMICalculatorPage() {
  const [units, setUnits] = useState<UnitSystem>("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const calculateBMI = (): number | null => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return null;

    if (units === "metric") {
      const hCm = parseFloat(height);
      if (isNaN(hCm) || hCm <= 0) return null;
      const hM = hCm / 100;
      return w / (hM * hM);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inches;
      if (totalInches <= 0) return null;
      return (w / (totalInches * totalInches)) * 703;
    }
  };

  const bmi = calculateBMI();
  const category = bmi ? bmiCategories.find((c) => bmi >= c.min && bmi < c.max) : null;

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">BMI Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate your Body Mass Index instantly.</p>

        <AdBanner slot="bmi-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Unit toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setUnits("metric")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${units === "metric" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"}`}
                >
                  Metric (kg/cm)
                </button>
                <button
                  onClick={() => setUnits("imperial")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${units === "imperial" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"}`}
                >
                  Imperial (lb/ft)
                </button>
              </div>

              {/* Weight */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Weight ({units === "metric" ? "kg" : "lbs"})</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary"
                  placeholder={units === "metric" ? "e.g. 70" : "e.g. 154"}
                />
              </div>

              {/* Height */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Height</label>
                {units === "metric" ? (
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary"
                    placeholder="Height in cm, e.g. 175"
                  />
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="flex-1 bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary"
                      placeholder="Feet"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="flex-1 bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary"
                      placeholder="Inches"
                    />
                  </div>
                )}
              </div>

              {/* Result */}
              {bmi !== null && (
                <div className="bg-display-bg border border-display-border rounded-xl p-6 text-center">
                  <p className="text-sm text-muted mb-1">Your BMI</p>
                  <p className="text-5xl font-bold font-mono mb-2">{bmi.toFixed(1)}</p>
                  {category && <p className={`text-lg font-semibold ${category.color}`}>{category.label}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Info sidebar */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 space-y-6">
            <div className="bg-card-bg border border-card-border rounded-2xl p-4">
              <h3 className="font-semibold mb-3">BMI Categories</h3>
              <div className="space-y-2">
                {bmiCategories.map((cat) => (
                  <div key={cat.label} className="flex justify-between items-center text-sm">
                    <span className={`font-medium ${cat.color}`}>{cat.label}</span>
                    <span className="text-muted font-mono">{cat.range}</span>
                  </div>
                ))}
              </div>
            </div>
            <AdBanner slot="bmi-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">What is BMI?</h2>
          <p className="text-muted mb-4">
            Body Mass Index (BMI) is a measure of body fat based on height and weight. It applies to adult men and women.
            BMI is calculated by dividing weight in kilograms by height in meters squared (kg/m²).
          </p>
          <p className="text-muted">
            While BMI is a useful screening tool, it does not directly measure body fat and may not be accurate for athletes,
            elderly individuals, or pregnant women. Consult a healthcare professional for a complete health assessment.
          </p>
        </section>
      </div>
    </div>
  );
}
