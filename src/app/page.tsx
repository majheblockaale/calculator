import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "CalcOnline — Free Online Calculator & Unit Converter",
  description:
    "The ultimate free online calculator and converter. Scientific calculator, unit converter, currency converter and more. Fast, free, no signup required.",
};

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
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Ultimate Free{" "}
            <span className="text-primary">Calculator</span> &{" "}
            <span className="text-primary">Converter</span>
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 max-w-2xl mx-auto">
            Calculate and convert anything, anywhere. Scientific calculator, unit converter,
            currency converter — all in one place. Free, fast, no signup required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/calculator"
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors text-lg"
            >
              Open Calculator
            </Link>
            <Link
              href="/unit-converter"
              className="px-8 py-3 bg-btn-bg rounded-xl font-semibold hover:bg-btn-hover transition-colors text-lg"
            >
              Convert Units
            </Link>
          </div>
        </div>
      </section>

      <AdBanner slot="home-top" format="horizontal" className="mb-12" />

      {/* Tools Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            All the Tools You Need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Features Section */}
      <section className="px-4 pb-16 bg-card-bg border-y border-card-border py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Why CalcOnline?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted">
                Instant calculations with no loading screens. Works offline too.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="font-semibold text-lg mb-2">100% Free</h3>
              <p className="text-sm text-muted">
                No signups, no subscriptions, no premium tiers. Every tool is completely free.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold text-lg mb-2">Works Everywhere</h3>
              <p className="text-sm text-muted">
                Responsive design that works on phones, tablets, and desktops. Install as an app.
              </p>
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
            <li>Unit Converter — length, weight, temperature, volume, area, speed, and more</li>
            <li>Currency Converter — 150+ world currencies with live exchange rates</li>
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
