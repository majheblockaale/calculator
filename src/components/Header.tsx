"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";

const navLinks = [
  { href: "/calculator", label: "Calculator" },
  { href: "/scientific-calculator", label: "Scientific" },
  { href: "/unit-converter", label: "Converter" },
  { href: "/currency-converter", label: "Currency" },
];

const moreLinks = [
  { href: "/graphing-calculator", label: "Graphing" },
  { href: "/crypto-converter", label: "Crypto" },
  { href: "/solver", label: "Solver" },
  { href: "/bmi-calculator", label: "BMI" },
  { href: "/mortgage-calculator", label: "Mortgage" },
  { href: "/tip-calculator", label: "Tip" },
  { href: "/percentage-calculator", label: "Percentage" },
  { href: "/date-calculator", label: "Date" },
  { href: "/age-calculator", label: "Age" },
  { href: "/gpa-calculator", label: "GPA" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card-bg border-b border-card-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
          <span className="text-2xl">⊞</span>
          CalcOnline
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-btn-bg transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-btn-bg transition-colors flex items-center gap-1"
            >
              More
              <span className="text-xs">{moreOpen ? "▲" : "▼"}</span>
            </button>
            {moreOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                <div className="absolute top-full right-0 mt-1 w-56 bg-card-bg border border-card-border rounded-xl shadow-lg z-50 py-2">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-btn-bg transition-colors"
                    >
                      {link.label} Calculator
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSelector />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-btn-bg transition-colors text-lg"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-btn-bg"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-card-border bg-card-bg px-4 py-2 max-h-[70vh] overflow-y-auto">
          {[...navLinks, ...moreLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-3 rounded-lg text-sm font-medium hover:bg-btn-bg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
