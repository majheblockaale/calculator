"use client";

import { useState, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function LeaseCalculatorPage() {
  const [assetValue, setAssetValue] = useState("");
  const [residualValue, setResidualValue] = useState("");
  const [leaseTerm, setLeaseTerm] = useState("36");
  const [rateInput, setRateInput] = useState("");
  const [rateType, setRateType] = useState<"money-factor" | "apr">("apr");
  const [downPayment, setDownPayment] = useState("");
  const [fees, setFees] = useState("");

  const results = useMemo(() => {
    const asset = parseFloat(assetValue);
    const residual = parseFloat(residualValue);
    const term = parseInt(leaseTerm);
    const rate = parseFloat(rateInput);
    const down = parseFloat(downPayment) || 0;
    const totalFees = parseFloat(fees) || 0;

    if (isNaN(asset) || asset <= 0 || isNaN(residual) || residual < 0 || isNaN(term) || term <= 0 || isNaN(rate) || rate < 0) {
      return null;
    }

    const moneyFactor = rateType === "money-factor" ? rate : rate / 2400;
    const apr = rateType === "apr" ? rate : rate * 2400;

    const netCapCost = asset - down + totalFees;
    const depreciation = (netCapCost - residual) / term;
    const financeCharge = (netCapCost + residual) * moneyFactor;
    const monthlyPayment = depreciation + financeCharge;
    const totalLeaseCost = monthlyPayment * term + down;
    const totalInterest = financeCharge * term;
    const totalDepreciation = depreciation * term;

    return {
      monthlyPayment,
      totalLeaseCost,
      totalInterest,
      totalDepreciation,
      netCapCost,
      apr,
      moneyFactor,
    };
  }, [assetValue, residualValue, leaseTerm, rateInput, rateType, downPayment, fees]);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Lease Calculator</h1>
        <p className="text-muted text-center mb-8">Calculate monthly lease payments and total lease costs.</p>

        <AdBanner slot="lease-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {/* Asset value */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Asset Value ($)</label>
                <input
                  type="number"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="35,000"
                  min="0"
                />
              </div>

              {/* Residual value */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Residual Value ($)</label>
                <input
                  type="number"
                  value={residualValue}
                  onChange={(e) => setResidualValue(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="18,000"
                  min="0"
                />
              </div>

              {/* Lease term */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Lease Term (months)</label>
                <input
                  type="number"
                  value={leaseTerm}
                  onChange={(e) => setLeaseTerm(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="36"
                  min="1"
                />
              </div>

              {/* Rate type and value */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-2 block">Interest Rate</label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    onClick={() => setRateType("apr")}
                    className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                      rateType === "apr" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    APR (%)
                  </button>
                  <button
                    onClick={() => setRateType("money-factor")}
                    className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                      rateType === "money-factor" ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    Money Factor
                  </button>
                </div>
                <input
                  type="number"
                  value={rateInput}
                  onChange={(e) => setRateInput(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder={rateType === "apr" ? "5.0" : "0.00208"}
                  min="0"
                  step={rateType === "apr" ? "0.1" : "0.00001"}
                />
              </div>

              {/* Down payment */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">Down Payment ($)</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* Fees */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">Fees ($)</label>
                <input
                  type="number"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className="w-full bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-xl focus:outline-none focus:border-primary"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* Results */}
              {results && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">Monthly Payment</span>
                    <span className="text-2xl font-bold font-mono text-primary">${fmt(results.monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Total Lease Cost</span>
                    <span className="text-xl font-bold font-mono">${fmt(results.totalLeaseCost)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Total Interest/Finance</span>
                    <span className="text-xl font-bold font-mono">${fmt(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Total Depreciation</span>
                    <span className="text-xl font-bold font-mono">${fmt(results.totalDepreciation)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">Net Cap Cost</span>
                    <span className="text-lg font-bold font-mono">${fmt(results.netCapCost)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-display-bg border border-display-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted">APR / Money Factor</span>
                    <span className="text-lg font-bold font-mono">{results.apr.toFixed(2)}% / {results.moneyFactor.toFixed(5)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AdBanner slot="lease-sidebar" format="rectangle" />
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">How Lease Payments Are Calculated</h2>
          <p className="text-muted mb-4">
            A lease payment consists of two parts: a depreciation charge and a finance charge. The
            depreciation charge covers the loss in value over the lease term, calculated as
            (Net Cap Cost - Residual Value) / Lease Term. The finance charge is calculated as
            (Net Cap Cost + Residual Value) x Money Factor.
          </p>
          <p className="text-muted mb-4">
            The money factor is related to APR by dividing the annual rate by 2,400. For example,
            a 6% APR equals a money factor of 0.0025. A lower money factor means lower finance
            charges and a more favorable lease.
          </p>
          <p className="text-muted">
            Your net capitalized cost is the asset price minus your down payment plus any fees
            rolled into the lease. Reducing the net cap cost with a larger down payment or
            negotiating a lower price will lower your monthly payment.
          </p>
        </section>
      </div>
    </div>
  );
}
