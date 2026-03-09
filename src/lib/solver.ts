export type Step = {
  description: string;
  expression: string;
};

export type SolveResult = {
  type: string;
  steps: Step[];
  answer: string;
};

export function solveExpression(input: string): SolveResult | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Try quadratic: ax² + bx + c = 0
  const quadratic = tryQuadratic(trimmed);
  if (quadratic) return quadratic;

  // Try linear equation: ax + b = c
  const linear = tryLinearEquation(trimmed);
  if (linear) return linear;

  // Try arithmetic expression
  const arithmetic = tryArithmetic(trimmed);
  if (arithmetic) return arithmetic;

  return null;
}

function tryQuadratic(input: string): SolveResult | null {
  // Match patterns like: 2x^2 + 3x - 5 = 0 or x^2 - 4 = 0
  const normalized = input.replace(/\s/g, "").replace(/[²]/g, "^2");

  // Check if it contains x^2 and = 0
  if (!normalized.includes("x^2") && !normalized.includes("x²")) return null;
  if (!normalized.includes("=")) return null;

  const [lhs] = normalized.split("=");

  // Parse coefficients a, b, c from ax^2 + bx + c
  let a = 0, b = 0, c = 0;

  // Very simplified parser
  const withX2 = lhs.replace(/x\^2/g, "X");
  const terms = withX2.replace(/-/g, "+-").split("+").filter(Boolean);

  for (const term of terms) {
    if (term.includes("X")) {
      const coef = term.replace("X", "");
      a = coef === "" || coef === "+" ? 1 : coef === "-" ? -1 : parseFloat(coef);
    } else if (term.includes("x")) {
      const coef = term.replace("x", "");
      b = coef === "" || coef === "+" ? 1 : coef === "-" ? -1 : parseFloat(coef);
    } else {
      c += parseFloat(term) || 0;
    }
  }

  if (a === 0 || isNaN(a)) return null;

  const steps: Step[] = [];
  steps.push({ description: "Identify the quadratic equation in standard form ax² + bx + c = 0", expression: `${a}x² + ${b}x + ${c} = 0` });
  steps.push({ description: "Identify coefficients", expression: `a = ${a}, b = ${b}, c = ${c}` });

  const discriminant = b * b - 4 * a * c;
  steps.push({ description: "Calculate the discriminant: b² - 4ac", expression: `Δ = (${b})² - 4(${a})(${c}) = ${discriminant}` });

  if (discriminant < 0) {
    steps.push({ description: "Discriminant is negative — no real solutions", expression: `Δ = ${discriminant} < 0` });
    return { type: "Quadratic Equation", steps, answer: "No real solutions" };
  }

  const sqrtDisc = Math.sqrt(discriminant);
  steps.push({ description: "Calculate √Δ", expression: `√${discriminant} = ${formatNum(sqrtDisc)}` });

  steps.push({ description: "Apply the quadratic formula: x = (-b ± √Δ) / 2a", expression: `x = (${-b} ± ${formatNum(sqrtDisc)}) / ${2 * a}` });

  const x1 = (-b + sqrtDisc) / (2 * a);
  const x2 = (-b - sqrtDisc) / (2 * a);

  if (discriminant === 0) {
    steps.push({ description: "One repeated root", expression: `x = ${formatNum(x1)}` });
    return { type: "Quadratic Equation", steps, answer: `x = ${formatNum(x1)}` };
  }

  steps.push({ description: "Calculate both roots", expression: `x₁ = ${formatNum(x1)}, x₂ = ${formatNum(x2)}` });
  return { type: "Quadratic Equation", steps, answer: `x₁ = ${formatNum(x1)}, x₂ = ${formatNum(x2)}` };
}

function tryLinearEquation(input: string): SolveResult | null {
  if (!input.includes("=") || !input.includes("x")) return null;
  if (input.includes("x^2") || input.includes("x²")) return null;

  const [lhsStr, rhsStr] = input.split("=").map((s) => s.trim());
  if (!lhsStr || !rhsStr) return null;

  const steps: Step[] = [];
  steps.push({ description: "Start with the equation", expression: `${lhsStr} = ${rhsStr}` });

  // Parse both sides: collect x coefficients and constants
  const lhs = parseLinearSide(lhsStr);
  const rhs = parseLinearSide(rhsStr);
  if (!lhs || !rhs) return null;

  // Move all x to left, constants to right
  const xCoef = lhs.xCoef - rhs.xCoef;
  const constant = rhs.constant - lhs.constant;

  steps.push({ description: "Move all x terms to the left and constants to the right", expression: `${xCoef}x = ${constant}` });

  if (xCoef === 0) {
    if (constant === 0) {
      steps.push({ description: "Identity — true for all x", expression: "Infinite solutions" });
      return { type: "Linear Equation", steps, answer: "Infinite solutions" };
    }
    steps.push({ description: "Contradiction — no solution", expression: `0 ≠ ${constant}` });
    return { type: "Linear Equation", steps, answer: "No solution" };
  }

  const result = constant / xCoef;
  steps.push({ description: `Divide both sides by ${xCoef}`, expression: `x = ${constant} / ${xCoef} = ${formatNum(result)}` });

  return { type: "Linear Equation", steps, answer: `x = ${formatNum(result)}` };
}

function parseLinearSide(str: string): { xCoef: number; constant: number } | null {
  let xCoef = 0;
  let constant = 0;
  const normalized = str.replace(/\s/g, "").replace(/-/g, "+-");
  const terms = normalized.split("+").filter(Boolean);

  for (const term of terms) {
    if (term.includes("x")) {
      const coef = term.replace("x", "");
      xCoef += coef === "" || coef === "+" ? 1 : coef === "-" ? -1 : parseFloat(coef);
    } else {
      constant += parseFloat(term) || 0;
    }
  }

  return { xCoef, constant };
}

function tryArithmetic(input: string): SolveResult | null {
  if (input.includes("x") || input.includes("=")) return null;

  const steps: Step[] = [];
  steps.push({ description: "Evaluate the expression", expression: input });

  try {
    // Handle common operations with steps
    const sanitized = input.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");

    // Show intermediate steps for basic ops
    const parts = sanitized.match(/[\d.]+|[+\-*/^()]/g);
    if (!parts) return null;

    // For simple binary operations, show work
    if (parts.length === 3 && ["+", "-", "*", "/", "^"].includes(parts[1])) {
      const a = parseFloat(parts[0]);
      const op = parts[1];
      const b = parseFloat(parts[2]);
      let result: number;

      const opName = { "+": "Add", "-": "Subtract", "*": "Multiply", "/": "Divide", "^": "Raise to power" }[op] || op;
      steps.push({ description: `${opName} ${a} and ${b}`, expression: `${a} ${op} ${b}` });

      switch (op) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; steps.push({ description: `Multiply: ${a} × ${b}`, expression: `= ${a * b}` }); break;
        case "/":
          if (b === 0) { steps.push({ description: "Cannot divide by zero", expression: "undefined" }); return { type: "Arithmetic", steps, answer: "undefined" }; }
          result = a / b; break;
        case "^": result = Math.pow(a, b); break;
        default: return null;
      }

      steps.push({ description: "Result", expression: `= ${formatNum(result!)}` });
      return { type: "Arithmetic", steps, answer: formatNum(result!) };
    }

    // General evaluation
    const fn = new Function(`"use strict"; return (${sanitized});`);
    const result = fn();
    if (typeof result !== "number" || !isFinite(result)) return null;

    steps.push({ description: "Calculate the result", expression: `= ${formatNum(result)}` });
    return { type: "Arithmetic", steps, answer: formatNum(result) };
  } catch {
    return null;
  }
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return parseFloat(n.toPrecision(10)).toString();
}
