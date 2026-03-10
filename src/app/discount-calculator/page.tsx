"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

type CalcMode = "calc-final" | "calc-discount" | "calc-original";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function DiscountCalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("calc-final");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  const results = useMemo(() => {
    if (mode === "calc-final") {
      const original = parseFloat(originalPrice);
      const discount = parseFloat(discountPercent);
      if (isNaN(original) || original < 0 || isNaN(discount) || discount < 0) return null;
      const savings = original * (discount / 100);
      const final_ = original - savings;
      return { originalPrice: original, finalPrice: final_, savings, discountPercent: discount };
    }

    if (mode === "calc-discount") {
      const original = parseFloat(originalPrice);
      const final_ = parseFloat(finalPrice);
      if (isNaN(original) || original <= 0 || isNaN(final_) || final_ < 0) return null;
      const savings = original - final_;
      const discount = (savings / original) * 100;
      return { originalPrice: original, finalPrice: final_, savings, discountPercent: discount };
    }

    if (mode === "calc-original") {
      const final_ = parseFloat(finalPrice);
      const discount = parseFloat(discountPercent);
      if (isNaN(final_) || final_ < 0 || isNaN(discount) || discount < 0 || discount >= 100) return null;
      const original = final_ / (1 - discount / 100);
      const savings = original - final_;
      return { originalPrice: original, finalPrice: final_, savings, discountPercent: discount };
    }

    return null;
  }, [mode, originalPrice, discountPercent, finalPrice]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Discount Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate discounts, savings, and sale prices.</p>

        <AdBanner slot="discount-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Mode selector */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-2 block">What do you want to calculate?</label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setMode("calc-final")}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      mode === "calc-final" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Final Price (from original + discount%)
                  </button>
                  <button
                    onClick={() => setMode("calc-discount")}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      mode === "calc-discount" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Discount % (from original + final price)
                  </button>
                  <button
                    onClick={() => setMode("calc-original")}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      mode === "calc-original" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Original Price (from final + discount%)
                  </button>
                </div>
              </div>

              {/* Original price - shown for calc-final and calc-discount */}
              {(mode === "calc-final" || mode === "calc-discount") && (
                <div className="mb-4">
                  <label className="text-sm text-muted mb-1 block">Original Price ($)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                    placeholder="100.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {/* Discount percent - shown for calc-final and calc-original */}
              {(mode === "calc-final" || mode === "calc-original") && (
                <div className="mb-4">
                  <label className="text-sm text-muted mb-1 block">Discount (%)</label>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                    placeholder="25"
                    min="0"
                    max={mode === "calc-original" ? "99.99" : "100"}
                    step="0.1"
                  />
                  {mode === "calc-final" && (
                    <div className="flex gap-2 mt-2">
                      {[10, 15, 20, 25, 30, 50].map((pct) => (
                        <button
                          key={pct}
                          onClick={() => setDiscountPercent(String(pct))}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            discountPercent === String(pct) ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Final price - shown for calc-discount and calc-original */}
              {(mode === "calc-discount" || mode === "calc-original") && (
                <div className="mb-6">
                  <label className="text-sm text-muted mb-1 block">Final Price ($)</label>
                  <input
                    type="number"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                    className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                    placeholder="75.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {/* Results */}
              {results && (
                <div className="space-y-3 mt-6">
                  {mode !== "calc-original" ? (
                    <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                      <span className="text-sm text-muted">Original Price</span>
                      <span className="text-xl font-bold font-mono">${fmt(results.originalPrice)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                      <span className="text-sm font-medium">Original Price</span>
                      <span className="text-2xl font-bold font-mono text-primary">${fmt(results.originalPrice)}</span>
                    </div>
                  )}

                  {mode !== "calc-discount" ? (
                    <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                      <span className="text-sm text-muted">Discount</span>
                      <span className="text-xl font-bold font-mono">{results.discountPercent.toFixed(2)}%</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                      <span className="text-sm font-medium">Discount</span>
                      <span className="text-2xl font-bold font-mono text-primary">{results.discountPercent.toFixed(2)}%</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">You Save</span>
                    <span className="text-xl font-bold font-mono text-green-500">${fmt(results.savings)}</span>
                  </div>

                  {mode === "calc-final" ? (
                    <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                      <span className="text-sm font-medium">Final Price</span>
                      <span className="text-2xl font-bold font-mono text-primary">${fmt(results.finalPrice)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                      <span className="text-sm text-muted">Final Price</span>
                      <span className="text-xl font-bold font-mono">${fmt(results.finalPrice)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="discount-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How to Calculate Discounts</h2>
          <p className="text-muted mb-4">
            To calculate a discounted price, multiply the original price by the discount percentage
            and subtract from the original. For example, 25% off a $80 item: $80 x 0.25 = $20
            discount, so the final price is $80 - $20 = $60.
          </p>
          <p className="text-muted mb-4">
            To find the discount percentage between two prices, subtract the final price from the
            original and divide by the original price. For example, an item marked down from $80 to
            $60: ($80 - $60) / $80 = 0.25, or 25% off.
          </p>
          <p className="text-muted">
            To find the original price when you know the final price and discount, divide the final
            price by (1 - discount/100). For example, if you paid $60 after a 25% discount, the
            original was $60 / 0.75 = $80.
          </p>
        </section>
      </div>
    </div>
  );
}
