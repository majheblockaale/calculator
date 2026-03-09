"use client";

import { useLocale } from "./LocaleProvider";
import { SUPPORTED_LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n";

export default function LanguageSelector() {
  const { locale, setLocale } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="bg-transparent border-none text-xs font-medium cursor-pointer focus:outline-none px-1 py-1 rounded hover:bg-btn-hover"
      aria-label="Select language"
    >
      {SUPPORTED_LOCALES.map((l) => (
        <option key={l} value={l}>
          {LOCALE_NAMES[l]}
        </option>
      ))}
    </select>
  );
}
