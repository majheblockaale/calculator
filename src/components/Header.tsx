"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/i18n";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";

const moreLinks = [
  { href: "/graphing-calculator", labelKey: null, label: "Graphing" },
  { href: "/crypto-converter", labelKey: null, label: "Crypto" },
  { href: "/solver", labelKey: null, label: "Solver" },
  { href: "/bmi-calculator", labelKey: null, label: "BMI" },
  { href: "/mortgage-calculator", labelKey: null, label: "Mortgage" },
  { href: "/tip-calculator", labelKey: null, label: "Tip" },
  { href: "/percentage-calculator", labelKey: null, label: "Percentage" },
  { href: "/date-calculator", labelKey: null, label: "Date" },
  { href: "/age-calculator", labelKey: null, label: "Age" },
  { href: "/gpa-calculator", labelKey: null, label: "GPA" },
] as const;

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { locale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const navLinks = [
    { href: "/calculator", label: t(locale, "nav.calculator") },
    { href: "/scientific-calculator", label: t(locale, "nav.scientific") },
    { href: "/unit-converter", label: t(locale, "nav.unitConverter") },
    { href: "/currency-converter", label: t(locale, "nav.currencyConverter") },
  ];

  const allLinks = [
    ...navLinks,
    ...moreLinks.map((l) => ({ href: l.href, label: l.label })),
  ];

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
              {t(locale, "nav.more")}
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
                      {link.label} {t(locale, "nav.calculator")}
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
          {allLinks.map((link) => (
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
