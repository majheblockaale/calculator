import Link from "next/link";

const calculators = [
  { href: "/calculator", label: "Basic Calculator" },
  { href: "/scientific-calculator", label: "Scientific Calculator" },
  { href: "/graphing-calculator", label: "Graphing Calculator" },
  { href: "/solver", label: "Step-by-Step Solver" },
];

const converters = [
  { href: "/unit-converter", label: "Unit Converter" },
  { href: "/currency-converter", label: "Currency Converter" },
  { href: "/crypto-converter", label: "Crypto Converter" },
];

const smartTools = [
  { href: "/bmi-calculator", label: "BMI Calculator" },
  { href: "/mortgage-calculator", label: "Mortgage Calculator" },
  { href: "/tip-calculator", label: "Tip Calculator" },
  { href: "/percentage-calculator", label: "Percentage Calculator" },
  { href: "/date-calculator", label: "Date Calculator" },
  { href: "/age-calculator", label: "Age Calculator" },
  { href: "/gpa-calculator", label: "GPA Calculator" },
];

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card-bg mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 text-primary">CalcOnline</h3>
            <p className="text-sm text-muted">
              The ultimate free calculator and converter platform. Calculate and convert anything, anywhere.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Calculators</h4>
            <ul className="space-y-2">
              {calculators.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Converters</h4>
            <ul className="space-y-2">
              {converters.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Smart Tools</h4>
            <ul className="space-y-2">
              {smartTools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-card-border text-center text-sm text-muted">
          © {new Date().getFullYear()} CalcOnline. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
