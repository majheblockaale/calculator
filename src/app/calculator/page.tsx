"use client";

import { useState, useCallback, useEffect } from "react";
import AdBanner from "@/components/AdBanner";
import { addToHistory, getHistory, clearHistory, downloadCSV, type HistoryEntry } from "@/lib/history";

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [memory, setMemory] = useState(0);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load persisted history on mount
  useEffect(() => {
    setHistory(getHistory().filter((h) => h.tool === "Basic Calculator"));
  }, []);
  const [showHistory, setShowHistory] = useState(false);

  const inputDigit = useCallback(
    (digit: string) => {
      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? digit : display + digit);
      }
    },
    [display, waitingForOperand]
  );

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const clearAll = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setWaitingForOperand(false);
  }, []);

  const toggleSign = useCallback(() => {
    const val = parseFloat(display);
    setDisplay(String(-val));
  }, [display]);

  const inputPercent = useCallback(() => {
    const val = parseFloat(display);
    setDisplay(String(val / 100));
  }, [display]);

  const performOperation = useCallback(
    (nextOperator: string) => {
      const inputValue = parseFloat(display);

      if (nextOperator === "=") {
        if (expression) {
          const fullExpr = expression + display;
          try {
            const result = evaluateExpression(fullExpr);
            const resultStr = formatNumber(result);
            addToHistory({ tool: "Basic Calculator", expression: fullExpr, result: resultStr });
            setHistory((prev) => [
              { id: "", tool: "Basic Calculator", expression: fullExpr, result: resultStr, timestamp: Date.now() },
              ...prev.slice(0, 49),
            ]);
            setDisplay(resultStr);
            setExpression("");
          } catch {
            setDisplay("Error");
            setExpression("");
          }
        }
      } else {
        if (expression && !waitingForOperand) {
          const fullExpr = expression + display;
          try {
            const result = evaluateExpression(fullExpr);
            setDisplay(formatNumber(result));
            setExpression(formatNumber(result) + ` ${nextOperator} `);
          } catch {
            setDisplay("Error");
            setExpression("");
            return;
          }
        } else {
          setExpression(display + ` ${nextOperator} `);
        }
      }
      setWaitingForOperand(true);
    },
    [display, expression, waitingForOperand]
  );

  const backspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
      else if (e.key === ".") inputDecimal();
      else if (e.key === "+") performOperation("+");
      else if (e.key === "-") performOperation("−");
      else if (e.key === "*") performOperation("×");
      else if (e.key === "/") { e.preventDefault(); performOperation("÷"); }
      else if (e.key === "Enter" || e.key === "=") performOperation("=");
      else if (e.key === "Escape") clearAll();
      else if (e.key === "Backspace") backspace();
      else if (e.key === "%") inputPercent();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputDigit, inputDecimal, performOperation, clearAll, backspace, inputPercent]);

  const buttons = [
    { label: "C", action: clearAll, className: "calc-btn-secondary" },
    { label: "±", action: toggleSign },
    { label: "%", action: inputPercent },
    { label: "÷", action: () => performOperation("÷"), className: "calc-btn-primary" },
    { label: "7", action: () => inputDigit("7") },
    { label: "8", action: () => inputDigit("8") },
    { label: "9", action: () => inputDigit("9") },
    { label: "×", action: () => performOperation("×"), className: "calc-btn-primary" },
    { label: "4", action: () => inputDigit("4") },
    { label: "5", action: () => inputDigit("5") },
    { label: "6", action: () => inputDigit("6") },
    { label: "−", action: () => performOperation("−"), className: "calc-btn-primary" },
    { label: "1", action: () => inputDigit("1") },
    { label: "2", action: () => inputDigit("2") },
    { label: "3", action: () => inputDigit("3") },
    { label: "+", action: () => performOperation("+"), className: "calc-btn-primary" },
    { label: "⌫", action: backspace },
    { label: "0", action: () => inputDigit("0") },
    { label: ".", action: inputDecimal },
    { label: "=", action: () => performOperation("="), className: "calc-btn-accent" },
  ];

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Online Calculator</h1>
        <p className="text-muted text-center mb-8">
          Free basic calculator with memory functions and calculation history.
        </p>

        <AdBanner slot="calc-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Calculator */}
          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-4 shadow-lg">
              {/* Display */}
              <div className="bg-display-bg border border-display-border rounded-xl p-4 mb-4">
                <div className="text-right text-sm text-muted h-6 overflow-hidden">
                  {expression}
                </div>
                <div className="text-right text-4xl font-mono font-bold truncate">
                  {display}
                </div>
              </div>

              {/* Memory buttons */}
              <div className="grid grid-cols-5 gap-1 mb-2">
                {[
                  { label: "MC", action: () => setMemory(0) },
                  { label: "MR", action: () => { setDisplay(String(memory)); setWaitingForOperand(true); } },
                  { label: "M+", action: () => setMemory(memory + parseFloat(display)) },
                  { label: "M−", action: () => setMemory(memory - parseFloat(display)) },
                  { label: "MS", action: () => setMemory(parseFloat(display)) },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    className="text-xs py-2 rounded-lg hover:bg-btn-hover transition-colors text-muted font-medium"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Main buttons */}
              <div className="grid grid-cols-4 gap-2">
                {buttons.map((btn) => (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    className={`calc-btn ${btn.className || ""}`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: History + Ad */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 space-y-6">
            <div className="bg-card-bg border border-card-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">History</h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-sm text-primary hover:underline"
                >
                  {showHistory ? "Hide" : "Show"}
                </button>
              </div>
              {showHistory && (
                <>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {history.length === 0 ? (
                      <p className="text-sm text-muted">No calculations yet.</p>
                    ) : (
                      history.map((entry, i) => (
                        <div
                          key={i}
                          className="text-sm p-2 rounded-lg bg-display-bg cursor-pointer hover:bg-btn-hover"
                          onClick={() => {
                            setDisplay(entry.result);
                            setWaitingForOperand(true);
                          }}
                        >
                          <div className="text-muted text-xs">{entry.expression}</div>
                          <div className="font-mono font-semibold">= {entry.result}</div>
                        </div>
                      ))
                    )}
                  </div>
                  {history.length > 0 && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-card-border">
                      <button onClick={downloadCSV} className="flex-1 py-1.5 rounded-lg bg-btn-bg hover:bg-btn-hover text-xs font-medium">
                        Export CSV
                      </button>
                      <button onClick={() => { clearHistory(); setHistory([]); }} className="flex-1 py-1.5 rounded-lg bg-btn-bg hover:bg-btn-hover text-xs font-medium text-red-500">
                        Clear All
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <AdBanner slot="calc-sidebar" format="rectangle" />
          </div>
        </div>

        {/* SEO Content */}
        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Free Online Calculator</h2>
          <p className="text-muted mb-4">
            Use this free online calculator for all your basic math needs. It supports addition,
            subtraction, multiplication, division, percentages, and memory functions. Your
            calculation history is saved so you can review past calculations.
          </p>
          <h3 className="text-xl font-semibold mb-3">Features</h3>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>Basic arithmetic: add, subtract, multiply, divide</li>
            <li>Percentage calculations</li>
            <li>Memory functions: MC, MR, M+, M−, MS</li>
            <li>Calculation history</li>
            <li>Full keyboard support</li>
            <li>Works on all devices — mobile, tablet, desktop</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function evaluateExpression(expr: string): number {
  const sanitized = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");

  // Simple safe evaluator using Function constructor with only math
  const fn = new Function(`"use strict"; return (${sanitized});`);
  const result = fn();
  if (typeof result !== "number" || !isFinite(result)) {
    throw new Error("Invalid result");
  }
  return result;
}

function formatNumber(num: number): string {
  if (Number.isInteger(num) && Math.abs(num) < 1e15) {
    return String(num);
  }
  const str = num.toPrecision(12);
  return parseFloat(str).toString();
}
