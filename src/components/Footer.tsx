import Link from "next/link";

const toolLinks = [
  { href: "/calculator", label: "Basic Calculator" },
  { href: "/scientific-calculator", label: "Scientific Calculator" },
  { href: "/unit-converter", label: "Unit Converter" },
  { href: "/currency-converter", label: "Currency Converter" },
];

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card-bg mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 text-primary">CalcOnline</h3>
            <p className="text-sm text-muted">
              The ultimate free calculator and converter platform. Calculate and convert anything, anywhere.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Tools</h4>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">About</h4>
            <p className="text-sm text-muted">
              CalcOnline is a free, ad-supported platform. We combine the power of scientific and graphing calculators with comprehensive unit and currency converters.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-card-border text-center text-sm text-muted">
          © {new Date().getFullYear()} CalcOnline. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
