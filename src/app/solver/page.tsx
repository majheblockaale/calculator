"use client";

import { useState } from "react";
import { solveExpression, type SolveResult } from "@/lib/solver";
import AdBanner from "@/components/AdBanner";

const examples = [
  "2x + 5 = 13",
  "x^2 - 5x + 6 = 0",
  "3x^2 + 2x - 8 = 0",
  "4x - 7 = 2x + 9",
  "x^2 - 16 = 0",
  "125 * 8 + 32",
];

export default function SolverPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<SolveResult | null>(null);
  const [error, setError] = useState("");

  const handleSolve = () => {
    setError("");
    const res = solveExpression(input);
    if (res) {
      setResult(res);
    } else {
      setError("Could not solve this expression. Try a linear equation (2x + 3 = 7), quadratic (x² - 4 = 0), or arithmetic expression.");
      setResult(null);
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Step-by-Step Math Solver</h1>
        <p className="text-muted text-center mb-8">
          Enter an equation or expression to see the solution with detailed steps.
        </p>

        <AdBanner slot="solver-top" format="horizontal" className="mb-8" />

        <div className="max-w-2xl mx-auto">
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
            {/* Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSolve()}
                className="flex-1 bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary"
                placeholder="e.g. 2x + 5 = 13"
              />
              <button
                onClick={handleSolve}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors"
              >
                Solve
              </button>
            </div>

            {/* Example buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => { setInput(ex); setResult(null); setError(""); }}
                  className="px-3 py-1 rounded-lg bg-btn-bg hover:bg-btn-hover text-xs font-mono transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-500 mb-4">
                {error}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                    {result.type}
                  </span>
                </div>

                {/* Steps */}
                <div className="space-y-2">
                  {result.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted">{step.description}</p>
                        <p className="font-mono font-semibold">{step.expression}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Answer */}
                <div className="mt-4 bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                  <p className="text-sm text-muted mb-1">Answer</p>
                  <p className="text-2xl font-bold font-mono text-primary">{result.answer}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Math Solver with Steps</h2>
          <p className="text-muted mb-4">
            Our step-by-step solver shows you exactly how to solve math problems. Currently supports:
          </p>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>Linear equations (e.g., 2x + 5 = 13)</li>
            <li>Quadratic equations (e.g., x² - 5x + 6 = 0)</li>
            <li>Arithmetic expressions (e.g., 125 * 8 + 32)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
