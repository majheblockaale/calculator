"use client";

import { useState, useMemo } from "react";
import { unitCategories, convertUnit } from "@/lib/units";
import AdBanner from "@/components/AdBanner";

export default function UnitConverterPage() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [fromValue, setFromValue] = useState("1");

  const category = unitCategories[selectedCategory];

  const result = useMemo(() => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) return "";
    const converted = convertUnit(
      val,
      category,
      category.units[fromUnit].id,
      category.units[toUnit].id
    );
    if (isNaN(converted)) return "Error";
    return formatResult(converted);
  }, [fromValue, category, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result && result !== "Error") {
      setFromValue(result);
    }
  };

  const handleCategoryChange = (index: number) => {
    setSelectedCategory(index);
    setFromUnit(0);
    setToUnit(1);
    setFromValue("1");
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Unit Converter</h1>
        <p className="text-muted text-center mb-8">
          Convert between hundreds of units across {unitCategories.length} categories.
        </p>

        <AdBanner slot="unit-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-3 lg:sticky lg:top-20">
              <h3 className="font-semibold text-sm px-2 mb-2 text-muted">Categories</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-1">
                {unitCategories.map((cat, i) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryChange(i)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                      i === selectedCategory
                        ? "bg-primary text-white"
                        : "hover:bg-btn-hover"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Converter */}
          <div className="flex-1 max-w-xl">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>{category.icon}</span>
                {category.name} Converter
              </h2>

              {/* From */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">From</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                    className="flex-1 bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary"
                    placeholder="Enter value"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(Number(e.target.value))}
                    className="bg-display-bg border border-display-border rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-primary min-w-[140px]"
                  >
                    {category.units.map((unit, i) => (
                      <option key={unit.id} value={i}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap button */}
              <div className="flex justify-center my-2">
                <button
                  onClick={swapUnits}
                  className="p-2 rounded-full hover:bg-btn-hover transition-colors text-xl"
                  aria-label="Swap units"
                >
                  ⇅
                </button>
              </div>

              {/* To */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">To</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-lg">
                    {result || "0"}
                  </div>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(Number(e.target.value))}
                    className="bg-display-bg border border-display-border rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-primary min-w-[140px]"
                  >
                    {category.units.map((unit, i) => (
                      <option key={unit.id} value={i}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conversion formula display */}
              <div className="bg-display-bg border border-display-border rounded-xl p-4 text-sm text-muted">
                <p className="font-medium mb-1">Conversion</p>
                <p>
                  {fromValue || "1"} {category.units[fromUnit].name} = {result || "0"}{" "}
                  {category.units[toUnit].name}
                </p>
              </div>
            </div>

            {/* Quick reference table */}
            <div className="mt-6 bg-card-bg border border-card-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Quick Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="text-left py-2 pr-4">
                        {category.units[fromUnit].name}
                      </th>
                      <th className="text-left py-2">
                        {category.units[toUnit].name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 5, 10, 25, 50, 100, 500, 1000].map((val) => {
                      const converted = convertUnit(
                        val,
                        category,
                        category.units[fromUnit].id,
                        category.units[toUnit].id
                      );
                      return (
                        <tr key={val} className="border-b border-card-border">
                          <td className="py-2 pr-4 font-mono">{val}</td>
                          <td className="py-2 font-mono">{formatResult(converted)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Ad sidebar */}
          <div className="hidden xl:block">
            <AdBanner slot="unit-sidebar" format="rectangle" />
          </div>
        </div>

        {/* SEO Content */}
        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Free Online Unit Converter</h2>
          <p className="text-muted mb-4">
            Convert between hundreds of units across {unitCategories.length} categories including
            length, weight, temperature, volume, area, speed, time, digital storage, pressure,
            energy, power, frequency, fuel economy, angle, force, density, torque, and data
            transfer rates.
          </p>
          <h3 className="text-xl font-semibold mb-3">Supported Categories</h3>
          <ul className="list-disc list-inside text-muted space-y-1">
            {unitCategories.map((cat) => (
              <li key={cat.name}>
                {cat.icon} {cat.name} — {cat.units.length} units
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function formatResult(num: number): string {
  if (isNaN(num)) return "Error";
  if (Math.abs(num) < 0.000001 && num !== 0) return num.toExponential(6);
  if (Math.abs(num) >= 1e12) return num.toExponential(6);
  if (Number.isInteger(num)) return num.toLocaleString();
  return parseFloat(num.toPrecision(10)).toString();
}
