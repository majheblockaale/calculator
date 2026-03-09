export type UnitCategory = {
  name: string;
  icon: string;
  units: { id: string; name: string; factor: number; offset?: number }[];
};

// factor: multiply by this to convert TO the base unit
// For temperature, we use special handling
export const unitCategories: UnitCategory[] = [
  {
    name: "Length",
    icon: "📏",
    units: [
      { id: "m", name: "Meter", factor: 1 },
      { id: "km", name: "Kilometer", factor: 1000 },
      { id: "cm", name: "Centimeter", factor: 0.01 },
      { id: "mm", name: "Millimeter", factor: 0.001 },
      { id: "um", name: "Micrometer", factor: 1e-6 },
      { id: "nm", name: "Nanometer", factor: 1e-9 },
      { id: "mi", name: "Mile", factor: 1609.344 },
      { id: "yd", name: "Yard", factor: 0.9144 },
      { id: "ft", name: "Foot", factor: 0.3048 },
      { id: "in", name: "Inch", factor: 0.0254 },
      { id: "nmi", name: "Nautical Mile", factor: 1852 },
      { id: "ly", name: "Light Year", factor: 9.461e15 },
    ],
  },
  {
    name: "Weight",
    icon: "⚖️",
    units: [
      { id: "kg", name: "Kilogram", factor: 1 },
      { id: "g", name: "Gram", factor: 0.001 },
      { id: "mg", name: "Milligram", factor: 1e-6 },
      { id: "ug", name: "Microgram", factor: 1e-9 },
      { id: "t", name: "Metric Ton", factor: 1000 },
      { id: "lb", name: "Pound", factor: 0.453592 },
      { id: "oz", name: "Ounce", factor: 0.0283495 },
      { id: "st", name: "Stone", factor: 6.35029 },
      { id: "ust", name: "US Ton", factor: 907.185 },
      { id: "ukt", name: "Imperial Ton", factor: 1016.05 },
    ],
  },
  {
    name: "Temperature",
    icon: "🌡️",
    units: [
      { id: "c", name: "Celsius", factor: 1, offset: 0 },
      { id: "f", name: "Fahrenheit", factor: 1, offset: 0 },
      { id: "k", name: "Kelvin", factor: 1, offset: 0 },
    ],
  },
  {
    name: "Volume",
    icon: "🧊",
    units: [
      { id: "l", name: "Liter", factor: 1 },
      { id: "ml", name: "Milliliter", factor: 0.001 },
      { id: "m3", name: "Cubic Meter", factor: 1000 },
      { id: "cm3", name: "Cubic Centimeter", factor: 0.001 },
      { id: "gal_us", name: "US Gallon", factor: 3.78541 },
      { id: "gal_uk", name: "Imperial Gallon", factor: 4.54609 },
      { id: "qt_us", name: "US Quart", factor: 0.946353 },
      { id: "pt_us", name: "US Pint", factor: 0.473176 },
      { id: "cup_us", name: "US Cup", factor: 0.236588 },
      { id: "floz_us", name: "US Fluid Ounce", factor: 0.0295735 },
      { id: "tbsp", name: "Tablespoon", factor: 0.0147868 },
      { id: "tsp", name: "Teaspoon", factor: 0.00492892 },
    ],
  },
  {
    name: "Area",
    icon: "📐",
    units: [
      { id: "m2", name: "Square Meter", factor: 1 },
      { id: "km2", name: "Square Kilometer", factor: 1e6 },
      { id: "cm2", name: "Square Centimeter", factor: 1e-4 },
      { id: "mm2", name: "Square Millimeter", factor: 1e-6 },
      { id: "ha", name: "Hectare", factor: 10000 },
      { id: "acre", name: "Acre", factor: 4046.86 },
      { id: "mi2", name: "Square Mile", factor: 2.59e6 },
      { id: "ft2", name: "Square Foot", factor: 0.092903 },
      { id: "in2", name: "Square Inch", factor: 6.4516e-4 },
      { id: "yd2", name: "Square Yard", factor: 0.836127 },
    ],
  },
  {
    name: "Speed",
    icon: "🏎️",
    units: [
      { id: "ms", name: "Meters/Second", factor: 1 },
      { id: "kmh", name: "Kilometers/Hour", factor: 0.277778 },
      { id: "mph", name: "Miles/Hour", factor: 0.44704 },
      { id: "kn", name: "Knots", factor: 0.514444 },
      { id: "fts", name: "Feet/Second", factor: 0.3048 },
      { id: "mach", name: "Mach", factor: 343 },
      { id: "c", name: "Speed of Light", factor: 299792458 },
    ],
  },
  {
    name: "Time",
    icon: "⏱️",
    units: [
      { id: "s", name: "Second", factor: 1 },
      { id: "ms", name: "Millisecond", factor: 0.001 },
      { id: "us", name: "Microsecond", factor: 1e-6 },
      { id: "ns", name: "Nanosecond", factor: 1e-9 },
      { id: "min", name: "Minute", factor: 60 },
      { id: "hr", name: "Hour", factor: 3600 },
      { id: "day", name: "Day", factor: 86400 },
      { id: "wk", name: "Week", factor: 604800 },
      { id: "mo", name: "Month (30 days)", factor: 2592000 },
      { id: "yr", name: "Year (365 days)", factor: 31536000 },
    ],
  },
  {
    name: "Digital Storage",
    icon: "💾",
    units: [
      { id: "b", name: "Byte", factor: 1 },
      { id: "kb", name: "Kilobyte", factor: 1024 },
      { id: "mb", name: "Megabyte", factor: 1048576 },
      { id: "gb", name: "Gigabyte", factor: 1073741824 },
      { id: "tb", name: "Terabyte", factor: 1099511627776 },
      { id: "pb", name: "Petabyte", factor: 1125899906842624 },
      { id: "bit", name: "Bit", factor: 0.125 },
      { id: "kbit", name: "Kilobit", factor: 128 },
      { id: "mbit", name: "Megabit", factor: 131072 },
      { id: "gbit", name: "Gigabit", factor: 134217728 },
    ],
  },
  {
    name: "Pressure",
    icon: "🔧",
    units: [
      { id: "pa", name: "Pascal", factor: 1 },
      { id: "kpa", name: "Kilopascal", factor: 1000 },
      { id: "bar", name: "Bar", factor: 100000 },
      { id: "atm", name: "Atmosphere", factor: 101325 },
      { id: "psi", name: "PSI", factor: 6894.76 },
      { id: "mmhg", name: "mmHg", factor: 133.322 },
      { id: "torr", name: "Torr", factor: 133.322 },
    ],
  },
  {
    name: "Energy",
    icon: "⚡",
    units: [
      { id: "j", name: "Joule", factor: 1 },
      { id: "kj", name: "Kilojoule", factor: 1000 },
      { id: "cal", name: "Calorie", factor: 4.184 },
      { id: "kcal", name: "Kilocalorie", factor: 4184 },
      { id: "wh", name: "Watt-hour", factor: 3600 },
      { id: "kwh", name: "Kilowatt-hour", factor: 3600000 },
      { id: "ev", name: "Electron Volt", factor: 1.602e-19 },
      { id: "btu", name: "BTU", factor: 1055.06 },
      { id: "ftlb", name: "Foot-Pound", factor: 1.35582 },
    ],
  },
  {
    name: "Power",
    icon: "🔌",
    units: [
      { id: "w", name: "Watt", factor: 1 },
      { id: "kw", name: "Kilowatt", factor: 1000 },
      { id: "mw", name: "Megawatt", factor: 1e6 },
      { id: "hp", name: "Horsepower", factor: 745.7 },
      { id: "btuh", name: "BTU/hour", factor: 0.293071 },
      { id: "ftlbs", name: "Foot-Pounds/Second", factor: 1.35582 },
    ],
  },
  {
    name: "Frequency",
    icon: "🔊",
    units: [
      { id: "hz", name: "Hertz", factor: 1 },
      { id: "khz", name: "Kilohertz", factor: 1000 },
      { id: "mhz", name: "Megahertz", factor: 1e6 },
      { id: "ghz", name: "Gigahertz", factor: 1e9 },
    ],
  },
  {
    name: "Fuel Economy",
    icon: "⛽",
    units: [
      { id: "kml", name: "Km per Liter", factor: 1 },
      { id: "mpg_us", name: "Miles per Gallon (US)", factor: 0.425144 },
      { id: "mpg_uk", name: "Miles per Gallon (UK)", factor: 0.354006 },
      { id: "l100km", name: "Liters per 100km", factor: -1 }, // special inverse
    ],
  },
  {
    name: "Angle",
    icon: "📐",
    units: [
      { id: "deg", name: "Degree", factor: 1 },
      { id: "rad", name: "Radian", factor: 57.2958 },
      { id: "grad", name: "Gradian", factor: 0.9 },
      { id: "arcmin", name: "Arcminute", factor: 1 / 60 },
      { id: "arcsec", name: "Arcsecond", factor: 1 / 3600 },
      { id: "rev", name: "Revolution", factor: 360 },
    ],
  },
  {
    name: "Force",
    icon: "💪",
    units: [
      { id: "n", name: "Newton", factor: 1 },
      { id: "kn", name: "Kilonewton", factor: 1000 },
      { id: "lbf", name: "Pound-force", factor: 4.44822 },
      { id: "dyn", name: "Dyne", factor: 1e-5 },
      { id: "kgf", name: "Kilogram-force", factor: 9.80665 },
    ],
  },
  {
    name: "Density",
    icon: "🧱",
    units: [
      { id: "kgm3", name: "kg/m³", factor: 1 },
      { id: "gcm3", name: "g/cm³", factor: 1000 },
      { id: "kgl", name: "kg/L", factor: 1000 },
      { id: "lbin3", name: "lb/in³", factor: 27679.9 },
      { id: "lbft3", name: "lb/ft³", factor: 16.0185 },
    ],
  },
  {
    name: "Torque",
    icon: "🔩",
    units: [
      { id: "nm", name: "Newton-meter", factor: 1 },
      { id: "ftlb", name: "Foot-pound", factor: 1.35582 },
      { id: "inlb", name: "Inch-pound", factor: 0.112985 },
      { id: "kgm", name: "Kilogram-meter", factor: 9.80665 },
    ],
  },
  {
    name: "Data Transfer Rate",
    icon: "📡",
    units: [
      { id: "bps", name: "Bits/second", factor: 1 },
      { id: "kbps", name: "Kilobits/s", factor: 1000 },
      { id: "mbps", name: "Megabits/s", factor: 1e6 },
      { id: "gbps", name: "Gigabits/s", factor: 1e9 },
      { id: "Bps", name: "Bytes/s", factor: 8 },
      { id: "KBps", name: "Kilobytes/s", factor: 8000 },
      { id: "MBps", name: "Megabytes/s", factor: 8e6 },
    ],
  },
];

export function convertTemperature(value: number, fromId: string, toId: string): number {
  // Convert to Celsius first
  let celsius: number;
  switch (fromId) {
    case "c": celsius = value; break;
    case "f": celsius = (value - 32) * 5 / 9; break;
    case "k": celsius = value - 273.15; break;
    default: return NaN;
  }
  // Convert from Celsius to target
  switch (toId) {
    case "c": return celsius;
    case "f": return celsius * 9 / 5 + 32;
    case "k": return celsius + 273.15;
    default: return NaN;
  }
}

export function convertUnit(
  value: number,
  category: UnitCategory,
  fromId: string,
  toId: string
): number {
  if (category.name === "Temperature") {
    return convertTemperature(value, fromId, toId);
  }

  // Special handling for fuel economy (L/100km is inverse)
  if (category.name === "Fuel Economy") {
    const fromUnit = category.units.find((u) => u.id === fromId);
    const toUnit = category.units.find((u) => u.id === toId);
    if (!fromUnit || !toUnit) return NaN;

    let kml: number;
    if (fromUnit.factor === -1) {
      kml = value === 0 ? 0 : 100 / value;
    } else {
      kml = value * fromUnit.factor;
    }

    if (toUnit.factor === -1) {
      return kml === 0 ? 0 : 100 / kml;
    }
    return kml / toUnit.factor;
  }

  const fromUnit = category.units.find((u) => u.id === fromId);
  const toUnit = category.units.find((u) => u.id === toId);
  if (!fromUnit || !toUnit) return NaN;

  const baseValue = value * fromUnit.factor;
  return baseValue / toUnit.factor;
}
