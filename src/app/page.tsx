"use client";

import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";

const tools = [
  {
    href: "/calculator",
    title: "Basic Calculator",
    description: "Add, subtract, multiply, divide with memory functions and history.",
    icon: "🧮",
    color: "bg-blue-500",
  },
  {
    href: "/scientific-calculator",
    title: "Scientific Calculator",
    description: "Trigonometry, logarithms, exponents, factorials, and constants.",
    icon: "🔬",
    color: "bg-purple-500",
  },
  {
    href: "/unit-converter",
    title: "Unit Converter",
    description: "Convert between 70+ categories: length, weight, temperature, and more.",
    icon: "📐",
    color: "bg-green-500",
  },
  {
    href: "/currency-converter",
    title: "Currency Converter",
    description: "150+ world currencies with daily exchange rate updates.",
    icon: "💱",
    color: "bg-amber-500",
  },
  {
    href: "/graphing-calculator",
    title: "Graphing Calculator",
    description: "Plot equations, zoom, pan, and explore interactive graphs.",
    icon: "📊",
    color: "bg-indigo-500",
  },
  {
    href: "/crypto-converter",
    title: "Crypto Converter",
    description: "Bitcoin, Ethereum, and 50+ cryptocurrencies with live prices.",
    icon: "₿",
    color: "bg-orange-500",
  },
  {
    href: "/solver",
    title: "Step-by-Step Solver",
    description: "Get detailed solution steps for algebra and quadratic equations.",
    icon: "✏️",
    color: "bg-teal-500",
  },
  {
    href: "/mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Calculate monthly payments and view amortization schedules.",
    icon: "🏠",
    color: "bg-rose-500",
  },
];

export default function HomePage() {
  const { locale } = useLocale();

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t(locale, "home.title").split("Calculator").length > 1 ? (
              <>
                {t(locale, "home.title").split("Calculator")[0]}
                <span className="text-primary">Calculator</span>
                {t(locale, "home.title").split("Calculator")[1]?.split("Converter")[0]}
                <span className="text-primary">Converter</span>
                {t(locale, "home.title").split("Converter").pop()}
              </>
            ) : (
              t(locale, "home.title")
            )}
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 max-w-2xl mx-auto">
            {t(locale, "home.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/calculator"
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors text-lg"
            >
              {t(locale, "home.openCalculator")}
            </Link>
            <Link
              href="/unit-converter"
              className="px-8 py-3 bg-btn-bg rounded-xl font-semibold hover:bg-btn-hover transition-colors text-lg"
            >
              {t(locale, "home.convertUnits")}
            </Link>
          </div>
        </div>
      </section>

      <AdBanner slot="home-top" format="horizontal" className="mb-12" />

      {/* Tools Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {t(locale, "home.allTools")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-card-bg border border-card-border rounded-2xl p-6 hover:border-primary transition-all hover:shadow-lg"
              >
                <div
                  className={`${tool.color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                <p className="text-sm text-muted">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More Calculators */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t(locale, "nav.more")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { href: "/bmi-calculator", label: "BMI", icon: "⚖️" },
              { href: "/tip-calculator", label: "Tip", icon: "💵" },
              { href: "/percentage-calculator", label: "Percentage", icon: "%" },
              { href: "/date-calculator", label: "Date", icon: "📅" },
              { href: "/age-calculator", label: "Age", icon: "🎂" },
              { href: "/gpa-calculator", label: "GPA", icon: "🎓" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-card-bg border border-card-border rounded-xl p-4 text-center hover:border-primary transition-all hover:shadow-md"
              >
                <div className="text-2xl mb-2">{tool.icon}</div>
                <p className="text-sm font-medium">{tool.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Calculators */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Financial Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { href: "/finance-calculator", label: "Finance", icon: "💰" },
              { href: "/loan-calculator", label: "Loan", icon: "🏦" },
              { href: "/payment-calculator", label: "Payment", icon: "💳" },
              { href: "/mortgage-payoff-calculator", label: "Mortgage Payoff", icon: "🏡" },
              { href: "/compound-interest-calculator", label: "Compound Interest", icon: "📈" },
              { href: "/interest-calculator", label: "Interest", icon: "🔢" },
              { href: "/interest-rate-calculator", label: "Interest Rate", icon: "🎯" },
              { href: "/investment-calculator", label: "Investment", icon: "📊" },
              { href: "/roi-calculator", label: "ROI", icon: "🔄" },
              { href: "/401k-calculator", label: "401(k)", icon: "🏛️" },
              { href: "/retirement-calculator", label: "Retirement", icon: "🌅" },
              { href: "/salary-calculator", label: "Salary", icon: "💼" },
              { href: "/paycheck-calculator", label: "Paycheck", icon: "🧾" },
              { href: "/income-tax-calculator", label: "Income Tax", icon: "📋" },
              { href: "/sales-tax-calculator", label: "Sales Tax", icon: "🛒" },
              { href: "/inflation-calculator", label: "Inflation", icon: "📉" },
              { href: "/amortization-calculator", label: "Amortization", icon: "📑" },
              { href: "/auto-loan-calculator", label: "Auto Loan", icon: "🚗" },
              { href: "/lease-calculator", label: "Lease", icon: "📝" },
              { href: "/mutual-fund-calculator", label: "Mutual Fund", icon: "🗂️" },
              { href: "/discount-calculator", label: "Discount", icon: "🏷️" },
              { href: "/margin-calculator", label: "Margin", icon: "📐" },
              { href: "/markup-calculator", label: "Markup", icon: "🔖" },
              { href: "/profit-calculator", label: "Profit", icon: "💹" },
              { href: "/break-even-calculator", label: "Break-Even", icon: "⚖️" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-card-bg border border-card-border rounded-xl p-4 text-center hover:border-primary transition-all hover:shadow-md"
              >
                <div className="text-2xl mb-2">{tool.icon}</div>
                <p className="text-sm font-medium">{tool.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 pb-16 bg-card-bg border-y border-card-border py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {t(locale, "home.whyUs")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg mb-2">{t(locale, "home.fast")}</h3>
              <p className="text-sm text-muted">{t(locale, "home.fastDesc")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="font-semibold text-lg mb-2">{t(locale, "home.free")}</h3>
              <p className="text-sm text-muted">{t(locale, "home.freeDesc")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold text-lg mb-2">{t(locale, "home.everywhere")}</h3>
              <p className="text-sm text-muted">{t(locale, "home.everywhereDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      <AdBanner slot="home-bottom" format="horizontal" className="my-12" />

      {/* SEO Content */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Free Online Calculator</h2>
          <p className="text-muted mb-4">
            CalcOnline is your all-in-one destination for online calculations and conversions.
            Whether you need a basic calculator for everyday math, a scientific calculator for
            advanced equations, or a unit converter for quick conversions, we have you covered.
          </p>
          <h3 className="text-xl font-semibold mb-3">Calculator Tools Available</h3>
          <ul className="list-disc list-inside text-muted space-y-1 mb-4">
            <li>Basic Calculator — arithmetic, percentages, memory functions</li>
            <li>Scientific Calculator — trigonometry, logarithms, exponents, constants</li>
            <li>Graphing Calculator — plot equations, zoom, pan, multiple functions</li>
            <li>Unit Converter — length, weight, temperature, volume, area, speed, and more</li>
            <li>Currency Converter — 150+ world currencies with live exchange rates</li>
            <li>Crypto Converter — Bitcoin, Ethereum, and 50+ cryptocurrencies</li>
            <li>Step-by-Step Solver — detailed solutions for algebra and quadratics</li>
            <li>BMI, Tip, Mortgage, Percentage, Date, Age, GPA Calculators</li>
          </ul>
          <p className="text-muted">
            All tools are free to use, work on any device, and require no downloads or signups.
            Start calculating now!
          </p>
        </div>
      </section>
    </div>
  );
}
