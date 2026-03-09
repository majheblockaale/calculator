"use client";

import { useState, useCallback, useEffect } from "react";
import { evaluate } from "mathjs";
import AdBanner from "@/components/AdBanner";

export default function ScientificCalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [isRadians, setIsRadians] = useState(true);
  const [isSecondFn, setIsSecondFn] = useState(false);
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const appendToDisplay = useCallback(
    (value: string) => {
      if (display === "0" && value !== ".") {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
    },
    [display]
  );

  const clearAll = useCallback(() => {
    setDisplay("0");
    setExpression("");
  }, []);

  const backspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display]);

  const calculateResult = useCallback(() => {
    try {
      let expr = display;
      // Replace display characters with mathjs compatible ones
      expr = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
      expr = expr.replace(/π/g, "pi").replace(/τ/g, "(2*pi)");

      const result = evaluate(expr);
      const resultStr = typeof result === "number" ? formatNumber(result) : String(result);

      setHistory((prev) => [
        { expr: display, result: resultStr },
        ...prev.slice(0, 49),
      ]);
      setExpression(display);
      setDisplay(resultStr);
    } catch {
      setDisplay("Error");
    }
  }, [display]);

  const applyFunction = useCallback(
    (fn: string) => {
      const val = parseFloat(display);
      if (isNaN(val) && !["pi", "e"].includes(fn)) {
        setDisplay("Error");
        return;
      }

      let result: number;
      const angleVal = isRadians ? val : (val * Math.PI) / 180;

      switch (fn) {
        case "sin": result = Math.sin(angleVal); break;
        case "cos": result = Math.cos(angleVal); break;
        case "tan": result = Math.tan(angleVal); break;
        case "asin": result = isRadians ? Math.asin(val) : (Math.asin(val) * 180) / Math.PI; break;
        case "acos": result = isRadians ? Math.acos(val) : (Math.acos(val) * 180) / Math.PI; break;
        case "atan": result = isRadians ? Math.atan(val) : (Math.atan(val) * 180) / Math.PI; break;
        case "ln": result = Math.log(val); break;
        case "log": result = Math.log10(val); break;
        case "sqrt": result = Math.sqrt(val); break;
        case "cbrt": result = Math.cbrt(val); break;
        case "x2": result = val * val; break;
        case "x3": result = val * val * val; break;
        case "1/x": result = 1 / val; break;
        case "abs": result = Math.abs(val); break;
        case "floor": result = Math.floor(val); break;
        case "ceil": result = Math.ceil(val); break;
        case "exp": result = Math.exp(val); break;
        case "10x": result = Math.pow(10, val); break;
        case "fact":
          result = factorial(Math.round(val));
          break;
        case "pi": setDisplay(String(Math.PI)); return;
        case "e": setDisplay(String(Math.E)); return;
        default: return;
      }

      if (!isFinite(result)) {
        setDisplay("Error");
        return;
      }
      setDisplay(formatNumber(result));
    },
    [display, isRadians]
  );

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") appendToDisplay(e.key);
      else if (e.key === ".") appendToDisplay(".");
      else if (e.key === "+") appendToDisplay("+");
      else if (e.key === "-") appendToDisplay("-");
      else if (e.key === "*") appendToDisplay("×");
      else if (e.key === "/") { e.preventDefault(); appendToDisplay("÷"); }
      else if (e.key === "(") appendToDisplay("(");
      else if (e.key === ")") appendToDisplay(")");
      else if (e.key === "^") appendToDisplay("^");
      else if (e.key === "Enter" || e.key === "=") calculateResult();
      else if (e.key === "Escape") clearAll();
      else if (e.key === "Backspace") backspace();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [appendToDisplay, calculateResult, clearAll, backspace]);

  const sciButtons = isSecondFn
    ? [
        { label: "2nd", action: () => setIsSecondFn(false), className: "calc-btn-accent text-sm" },
        { label: "sin⁻¹", action: () => applyFunction("asin"), className: "text-sm" },
        { label: "cos⁻¹", action: () => applyFunction("acos"), className: "text-sm" },
        { label: "tan⁻¹", action: () => applyFunction("atan"), className: "text-sm" },
        { label: "10ˣ", action: () => applyFunction("10x"), className: "text-sm" },
        { label: "eˣ", action: () => applyFunction("exp"), className: "text-sm" },
        { label: "x³", action: () => applyFunction("x3"), className: "text-sm" },
        { label: "∛x", action: () => applyFunction("cbrt"), className: "text-sm" },
        { label: "⌈x⌉", action: () => applyFunction("ceil"), className: "text-sm" },
        { label: "⌊x⌋", action: () => applyFunction("floor"), className: "text-sm" },
      ]
    : [
        { label: "2nd", action: () => setIsSecondFn(true), className: "text-sm" },
        { label: "sin", action: () => applyFunction("sin"), className: "text-sm" },
        { label: "cos", action: () => applyFunction("cos"), className: "text-sm" },
        { label: "tan", action: () => applyFunction("tan"), className: "text-sm" },
        { label: "ln", action: () => applyFunction("ln"), className: "text-sm" },
        { label: "log", action: () => applyFunction("log"), className: "text-sm" },
        { label: "x²", action: () => applyFunction("x2"), className: "text-sm" },
        { label: "√x", action: () => applyFunction("sqrt"), className: "text-sm" },
        { label: "x!", action: () => applyFunction("fact"), className: "text-sm" },
        { label: "1/x", action: () => applyFunction("1/x"), className: "text-sm" },
      ];

  const mainButtons = [
    { label: "C", action: clearAll, className: "calc-btn-secondary" },
    { label: "(", action: () => appendToDisplay("(") },
    { label: ")", action: () => appendToDisplay(")") },
    { label: "÷", action: () => appendToDisplay("÷"), className: "calc-btn-primary" },
    { label: "7", action: () => appendToDisplay("7") },
    { label: "8", action: () => appendToDisplay("8") },
    { label: "9", action: () => appendToDisplay("9") },
    { label: "×", action: () => appendToDisplay("×"), className: "calc-btn-primary" },
    { label: "4", action: () => appendToDisplay("4") },
    { label: "5", action: () => appendToDisplay("5") },
    { label: "6", action: () => appendToDisplay("6") },
    { label: "−", action: () => appendToDisplay("-"), className: "calc-btn-primary" },
    { label: "1", action: () => appendToDisplay("1") },
    { label: "2", action: () => appendToDisplay("2") },
    { label: "3", action: () => appendToDisplay("3") },
    { label: "+", action: () => appendToDisplay("+"), className: "calc-btn-primary" },
    { label: "π", action: () => applyFunction("pi") },
    { label: "0", action: () => appendToDisplay("0") },
    { label: ".", action: () => appendToDisplay(".") },
    { label: "=", action: calculateResult, className: "calc-btn-accent" },
  ];

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Scientific Calculator
        </h1>
        <p className="text-muted text-center mb-8">
          Free online scientific calculator with trigonometry, logarithms, and more.
        </p>

        <AdBanner slot="sci-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-4 shadow-lg">
              {/* Display */}
              <div className="bg-display-bg border border-display-border rounded-xl p-4 mb-4">
                <div className="text-right text-sm text-muted h-6 overflow-hidden">
                  {expression}
                </div>
                <div className="text-right text-3xl font-mono font-bold truncate">
                  {display}
                </div>
              </div>

              {/* Mode toggle */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsRadians(true)}
                    className={`text-xs px-3 py-1 rounded-lg font-medium ${
                      isRadians ? "bg-primary text-white" : "hover:bg-btn-hover"
                    }`}
                  >
                    RAD
                  </button>
                  <button
                    onClick={() => setIsRadians(false)}
                    className={`text-xs px-3 py-1 rounded-lg font-medium ${
                      !isRadians ? "bg-primary text-white" : "hover:bg-btn-hover"
                    }`}
                  >
                    DEG
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => applyFunction("e")}
                    className="text-xs px-3 py-1 rounded-lg font-medium hover:bg-btn-hover"
                  >
                    e
                  </button>
                  <button onClick={backspace} className="text-xs px-3 py-1 rounded-lg hover:bg-btn-hover">
                    ⌫
                  </button>
                </div>
              </div>

              {/* Scientific buttons */}
              <div className="grid grid-cols-5 gap-1.5 mb-2">
                {sciButtons.map((btn) => (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    className={`calc-btn ${btn.className || ""}`}
                    style={{ minHeight: "2.75rem", fontSize: "0.875rem" }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Main buttons */}
              <div className="grid grid-cols-4 gap-2">
                {mainButtons.map((btn) => (
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

          {/* Sidebar */}
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
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-sm text-muted">No calculations yet.</p>
                  ) : (
                    history.map((entry, i) => (
                      <div
                        key={i}
                        className="text-sm p-2 rounded-lg bg-display-bg cursor-pointer hover:bg-btn-hover"
                        onClick={() => setDisplay(entry.result)}
                      >
                        <div className="text-muted text-xs">{entry.expr}</div>
                        <div className="font-mono font-semibold">= {entry.result}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <AdBanner slot="sci-sidebar" format="rectangle" />
          </div>
        </div>

        {/* SEO Content */}
        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Free Online Scientific Calculator</h2>
          <p className="text-muted mb-4">
            This free online scientific calculator provides all the functions you need for
            advanced math calculations. It includes trigonometric functions (sin, cos, tan),
            inverse trigonometric functions, logarithms (natural and base-10), exponents,
            factorials, square roots, and mathematical constants.
          </p>
          <h3 className="text-xl font-semibold mb-3">Features</h3>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>Trigonometric functions: sin, cos, tan and their inverses</li>
            <li>Logarithms: natural log (ln) and base-10 log</li>
            <li>Powers and roots: x², x³, √x, ∛x</li>
            <li>Constants: π (pi) and e (Euler&apos;s number)</li>
            <li>Factorial, absolute value, floor, ceiling</li>
            <li>Radian and degree mode toggle</li>
            <li>Full keyboard support</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function formatNumber(num: number): string {
  if (Number.isInteger(num) && Math.abs(num) < 1e15) {
    return String(num);
  }
  const str = num.toPrecision(12);
  return parseFloat(str).toString();
}
