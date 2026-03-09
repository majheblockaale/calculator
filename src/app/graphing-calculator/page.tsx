"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { evaluate } from "mathjs";
import AdBanner from "@/components/AdBanner";

type Equation = {
  id: number;
  expr: string;
  color: string;
  visible: boolean;
};

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"];

export default function GraphingCalculatorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [equations, setEquations] = useState<Equation[]>([
    { id: 1, expr: "sin(x)", color: COLORS[0], visible: true },
  ]);
  const [nextId, setNextId] = useState(2);
  const [viewWindow, setViewWindow] = useState({
    xMin: -10, xMax: 10, yMin: -6, yMax: 6,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  const addEquation = () => {
    setEquations((prev) => [
      ...prev,
      { id: nextId, expr: "", color: COLORS[(nextId - 1) % COLORS.length], visible: true },
    ]);
    setNextId((n) => n + 1);
  };

  const removeEquation = (id: number) => {
    setEquations((prev) => prev.filter((eq) => eq.id !== id));
  };

  const updateEquation = (id: number, expr: string) => {
    setEquations((prev) => prev.map((eq) => (eq.id === id ? { ...eq, expr } : eq)));
  };

  const toggleVisibility = (id: number) => {
    setEquations((prev) => prev.map((eq) => (eq.id === id ? { ...eq, visible: !eq.visible } : eq)));
  };

  const evaluateAt = useCallback(
    (expr: string, x: number): number | null => {
      try {
        const result = evaluate(expr, { x });
        if (typeof result === "number" && isFinite(result)) return result;
        return null;
      } catch {
        return null;
      }
    },
    []
  );

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    const { xMin, xMax, yMin, yMax } = viewWindow;
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;

    const toScreenX = (x: number) => ((x - xMin) / xRange) * w;
    const toScreenY = (y: number) => ((yMax - y) / yRange) * h;
    const toMathX = (sx: number) => xMin + (sx / w) * xRange;
    const toMathY = (sy: number) => yMax - (sy / h) * yRange;

    // Background
    const isDark = document.documentElement.classList.contains("dark");
    ctx.fillStyle = isDark ? "#111111" : "#f9fafb";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = isDark ? "#222222" : "#e5e7eb";
    ctx.lineWidth = 1;

    const gridStep = getGridStep(xRange);
    const startX = Math.ceil(xMin / gridStep) * gridStep;
    for (let x = startX; x <= xMax; x += gridStep) {
      const sx = toScreenX(x);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, h);
      ctx.stroke();
    }

    const gridStepY = getGridStep(yRange);
    const startY = Math.ceil(yMin / gridStepY) * gridStepY;
    for (let y = startY; y <= yMax; y += gridStepY) {
      const sy = toScreenY(y);
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(w, sy);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = isDark ? "#555555" : "#9ca3af";
    ctx.lineWidth = 2;
    const originX = toScreenX(0);
    const originY = toScreenY(0);
    if (originX >= 0 && originX <= w) {
      ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, h); ctx.stroke();
    }
    if (originY >= 0 && originY <= h) {
      ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(w, originY); ctx.stroke();
    }

    // Grid labels
    ctx.fillStyle = isDark ? "#888888" : "#6b7280";
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "center";
    for (let x = startX; x <= xMax; x += gridStep) {
      if (Math.abs(x) < gridStep * 0.01) continue;
      const sx = toScreenX(x);
      const label = formatLabel(x);
      ctx.fillText(label, sx, Math.min(Math.max(originY + 14, 14), h - 4));
    }
    ctx.textAlign = "right";
    for (let y = startY; y <= yMax; y += gridStepY) {
      if (Math.abs(y) < gridStepY * 0.01) continue;
      const sy = toScreenY(y);
      const label = formatLabel(y);
      ctx.fillText(label, Math.min(Math.max(originX - 4, 30), w - 4), sy + 4);
    }

    // Plot equations
    for (const eq of equations) {
      if (!eq.visible || !eq.expr.trim()) continue;
      ctx.strokeStyle = eq.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let penDown = false;
      const steps = Math.max(w * 2, 500);
      let prevY: number | null = null;

      for (let i = 0; i <= steps; i++) {
        const sx = (i / steps) * w;
        const mx = toMathX(sx);
        const my = evaluateAt(eq.expr, mx);
        if (my === null) { penDown = false; continue; }
        const sy = toScreenY(my);

        // Detect discontinuities
        if (prevY !== null && Math.abs(sy - prevY) > h * 0.5) {
          penDown = false;
        }

        if (!penDown) {
          ctx.moveTo(sx, sy);
          penDown = true;
        } else {
          ctx.lineTo(sx, sy);
        }
        prevY = sy;
      }
      ctx.stroke();
    }

    // Cursor crosshair
    if (cursorPos) {
      const mx = toMathX(cursorPos.x);
      const my = toMathY(cursorPos.y);
      ctx.strokeStyle = isDark ? "#444444" : "#d1d5db";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(cursorPos.x, 0); ctx.lineTo(cursorPos.x, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, cursorPos.y); ctx.lineTo(w, cursorPos.y); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = isDark ? "#cccccc" : "#374151";
      ctx.font = "12px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`(${mx.toFixed(2)}, ${my.toFixed(2)})`, cursorPos.x + 8, cursorPos.y - 8);
    }
  }, [equations, viewWindow, evaluateAt, cursorPos]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  useEffect(() => {
    const handleResize = () => drawGraph();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawGraph]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.1 : 0.9;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { xMin, xMax, yMin, yMax } = viewWindow;
    const mx = xMin + ((e.clientX - rect.left) / rect.width) * (xMax - xMin);
    const my = yMax - ((e.clientY - rect.top) / rect.height) * (yMax - yMin);

    setViewWindow({
      xMin: mx + (xMin - mx) * factor,
      xMax: mx + (xMax - mx) * factor,
      yMin: my + (yMin - my) * factor,
      yMax: my + (yMax - my) * factor,
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    if (!isDragging) return;
    const { xMin, xMax, yMin, yMax } = viewWindow;
    const dx = ((e.clientX - dragStart.x) / rect.width) * (xMax - xMin);
    const dy = ((e.clientY - dragStart.y) / rect.height) * (yMax - yMin);
    setViewWindow({
      xMin: xMin - dx, xMax: xMax - dx,
      yMin: yMin + dy, yMax: yMax + dy,
    });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => { setIsDragging(false); setCursorPos(null); };

  const resetView = () => setViewWindow({ xMin: -10, xMax: 10, yMin: -6, yMax: 6 });

  const zoomIn = () => {
    setViewWindow((v) => {
      const cx = (v.xMin + v.xMax) / 2, cy = (v.yMin + v.yMax) / 2;
      const hw = (v.xMax - v.xMin) / 2 * 0.7, hh = (v.yMax - v.yMin) / 2 * 0.7;
      return { xMin: cx - hw, xMax: cx + hw, yMin: cy - hh, yMax: cy + hh };
    });
  };

  const zoomOut = () => {
    setViewWindow((v) => {
      const cx = (v.xMin + v.xMax) / 2, cy = (v.yMin + v.yMax) / 2;
      const hw = (v.xMax - v.xMin) / 2 * 1.4, hh = (v.yMax - v.yMin) / 2 * 1.4;
      return { xMin: cx - hw, xMax: cx + hw, yMin: cy - hh, yMax: cy + hh };
    });
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Graphing Calculator</h1>
        <p className="text-muted text-center mb-8">
          Plot equations, zoom, pan, and explore interactive graphs.
        </p>

        <AdBanner slot="graph-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Equations panel */}
          <div className="lg:w-80 shrink-0 space-y-3">
            <div className="bg-card-bg border border-card-border rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Equations</h3>
              <div className="space-y-2">
                {equations.map((eq) => (
                  <div key={eq.id} className="flex items-center gap-2">
                    <button
                      onClick={() => toggleVisibility(eq.id)}
                      className="w-4 h-4 rounded-full shrink-0 border-2"
                      style={{
                        backgroundColor: eq.visible ? eq.color : "transparent",
                        borderColor: eq.color,
                      }}
                      aria-label="Toggle visibility"
                    />
                    <span className="text-muted text-sm">y =</span>
                    <input
                      type="text"
                      value={eq.expr}
                      onChange={(e) => updateEquation(eq.id, e.target.value)}
                      className="flex-1 bg-display-bg border border-display-border rounded-lg px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-primary"
                      placeholder="e.g. sin(x)"
                    />
                    {equations.length > 1 && (
                      <button
                        onClick={() => removeEquation(eq.id)}
                        className="text-muted hover:text-red-500 text-lg"
                        aria-label="Remove equation"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addEquation}
                className="mt-3 w-full py-2 rounded-lg bg-btn-bg hover:bg-btn-hover text-sm font-medium transition-colors"
              >
                + Add Equation
              </button>
            </div>

            {/* Presets */}
            <div className="bg-card-bg border border-card-border rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Example Graphs</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Parabola", expr: "x^2" },
                  { label: "Sine", expr: "sin(x)" },
                  { label: "Cosine", expr: "cos(x)" },
                  { label: "Tangent", expr: "tan(x)" },
                  { label: "Cubic", expr: "x^3" },
                  { label: "Abs", expr: "abs(x)" },
                  { label: "Log", expr: "log(x)" },
                  { label: "Sqrt", expr: "sqrt(x)" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => updateEquation(equations[0]?.id || 1, preset.expr)}
                    className="py-1.5 px-2 rounded-lg bg-btn-bg hover:bg-btn-hover text-xs font-medium transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <AdBanner slot="graph-sidebar" format="rectangle" />
          </div>

          {/* Graph area */}
          <div className="flex-1">
            <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-lg relative">
              {/* Controls */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                <button onClick={zoomIn} className="w-8 h-8 bg-card-bg border border-card-border rounded-lg flex items-center justify-center text-lg hover:bg-btn-hover">+</button>
                <button onClick={zoomOut} className="w-8 h-8 bg-card-bg border border-card-border rounded-lg flex items-center justify-center text-lg hover:bg-btn-hover">−</button>
                <button onClick={resetView} className="w-8 h-8 bg-card-bg border border-card-border rounded-lg flex items-center justify-center text-xs hover:bg-btn-hover">⌂</button>
              </div>

              <canvas
                ref={canvasRef}
                className="w-full cursor-crosshair"
                style={{ height: "500px" }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Free Online Graphing Calculator</h2>
          <p className="text-muted mb-4">
            Plot and explore mathematical functions with our free interactive graphing calculator.
            Enter equations, zoom in and out, pan across the coordinate plane, and visualize
            multiple functions simultaneously.
          </p>
          <h3 className="text-xl font-semibold mb-3">Features</h3>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>Plot multiple equations simultaneously with different colors</li>
            <li>Zoom and pan with mouse wheel and drag</li>
            <li>Coordinate display on hover</li>
            <li>Supports trig, log, sqrt, abs, and polynomial functions</li>
            <li>Example graphs for quick exploration</li>
            <li>Responsive design — works on all screen sizes</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function getGridStep(range: number): number {
  const raw = range / 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const normalized = raw / magnitude;
  if (normalized <= 1.5) return magnitude;
  if (normalized <= 3.5) return 2 * magnitude;
  if (normalized <= 7.5) return 5 * magnitude;
  return 10 * magnitude;
}

function formatLabel(value: number): string {
  if (Math.abs(value) >= 10000 || (Math.abs(value) < 0.01 && value !== 0)) {
    return value.toExponential(0);
  }
  return parseFloat(value.toPrecision(4)).toString();
}
