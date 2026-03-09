"use client";

import Link from "next/link";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/i18n";

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
  const { locale } = useLocale();

  return (
    <footer className="border-t border-card-border bg-card-bg mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 text-primary">CalcOnline</h3>
            <p className="text-sm text-muted">
              {t(locale, "footer.description")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">{t(locale, "nav.calculator")}s</h4>
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
            <h4 className="font-semibold mb-3">{t(locale, "nav.unitConverter")}s</h4>
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
            <h4 className="font-semibold mb-3">{t(locale, "footer.tools")}</h4>
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
          © {new Date().getFullYear()} CalcOnline. {t(locale, "footer.rights")}
        </div>
      </div>
    </footer>
  );
}
