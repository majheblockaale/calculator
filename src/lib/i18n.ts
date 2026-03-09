export const SUPPORTED_LOCALES = ["en", "es", "fr", "hi", "zh", "ar"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  hi: "हिन्दी",
  zh: "中文",
  ar: "العربية",
};

type TranslationKeys = {
  // Nav
  "nav.calculator": string;
  "nav.scientific": string;
  "nav.unitConverter": string;
  "nav.currencyConverter": string;
  "nav.more": string;
  // Homepage
  "home.title": string;
  "home.subtitle": string;
  "home.openCalculator": string;
  "home.convertUnits": string;
  "home.allTools": string;
  "home.whyUs": string;
  "home.fast": string;
  "home.fastDesc": string;
  "home.free": string;
  "home.freeDesc": string;
  "home.everywhere": string;
  "home.everywhereDesc": string;
  // Common
  "common.history": string;
  "common.show": string;
  "common.hide": string;
  "common.clear": string;
  "common.exportCSV": string;
  "common.from": string;
  "common.to": string;
  "common.swap": string;
  "common.result": string;
  "common.calculate": string;
  "common.solve": string;
  "common.features": string;
  // Footer
  "footer.tools": string;
  "footer.about": string;
  "footer.rights": string;
  "footer.description": string;
};

const translations: Record<Locale, TranslationKeys> = {
  en: {
    "nav.calculator": "Calculator",
    "nav.scientific": "Scientific",
    "nav.unitConverter": "Unit Converter",
    "nav.currencyConverter": "Currency",
    "nav.more": "More Tools",
    "home.title": "The Ultimate Free Calculator & Converter",
    "home.subtitle": "Calculate and convert anything, anywhere. Scientific calculator, unit converter, currency converter — all in one place. Free, fast, no signup required.",
    "home.openCalculator": "Open Calculator",
    "home.convertUnits": "Convert Units",
    "home.allTools": "All the Tools You Need",
    "home.whyUs": "Why CalcOnline?",
    "home.fast": "Lightning Fast",
    "home.fastDesc": "Instant calculations with no loading screens. Works offline too.",
    "home.free": "100% Free",
    "home.freeDesc": "No signups, no subscriptions, no premium tiers. Every tool is completely free.",
    "home.everywhere": "Works Everywhere",
    "home.everywhereDesc": "Responsive design that works on phones, tablets, and desktops. Install as an app.",
    "common.history": "History",
    "common.show": "Show",
    "common.hide": "Hide",
    "common.clear": "Clear All",
    "common.exportCSV": "Export CSV",
    "common.from": "From",
    "common.to": "To",
    "common.swap": "Swap",
    "common.result": "Result",
    "common.calculate": "Calculate",
    "common.solve": "Solve",
    "common.features": "Features",
    "footer.tools": "Tools",
    "footer.about": "About",
    "footer.rights": "All rights reserved.",
    "footer.description": "The ultimate free calculator and converter platform. Calculate and convert anything, anywhere.",
  },
  es: {
    "nav.calculator": "Calculadora",
    "nav.scientific": "Científica",
    "nav.unitConverter": "Conversor",
    "nav.currencyConverter": "Divisas",
    "nav.more": "Más Herramientas",
    "home.title": "La Mejor Calculadora y Conversor Gratuitos",
    "home.subtitle": "Calcula y convierte cualquier cosa, en cualquier lugar. Calculadora científica, conversor de unidades, conversor de divisas — todo en un solo lugar.",
    "home.openCalculator": "Abrir Calculadora",
    "home.convertUnits": "Convertir Unidades",
    "home.allTools": "Todas las Herramientas que Necesitas",
    "home.whyUs": "¿Por qué CalcOnline?",
    "home.fast": "Ultra Rápido",
    "home.fastDesc": "Cálculos instantáneos sin pantallas de carga. Funciona sin conexión.",
    "home.free": "100% Gratis",
    "home.freeDesc": "Sin registro, sin suscripciones, sin niveles premium. Todas las herramientas son gratuitas.",
    "home.everywhere": "Funciona en Todos Lados",
    "home.everywhereDesc": "Diseño responsivo que funciona en móviles, tablets y escritorios.",
    "common.history": "Historial",
    "common.show": "Mostrar",
    "common.hide": "Ocultar",
    "common.clear": "Borrar Todo",
    "common.exportCSV": "Exportar CSV",
    "common.from": "De",
    "common.to": "A",
    "common.swap": "Intercambiar",
    "common.result": "Resultado",
    "common.calculate": "Calcular",
    "common.solve": "Resolver",
    "common.features": "Características",
    "footer.tools": "Herramientas",
    "footer.about": "Acerca de",
    "footer.rights": "Todos los derechos reservados.",
    "footer.description": "La mejor plataforma gratuita de calculadora y conversor. Calcula y convierte cualquier cosa.",
  },
  fr: {
    "nav.calculator": "Calculatrice",
    "nav.scientific": "Scientifique",
    "nav.unitConverter": "Convertisseur",
    "nav.currencyConverter": "Devises",
    "nav.more": "Plus d'Outils",
    "home.title": "La Meilleure Calculatrice et Convertisseur Gratuits",
    "home.subtitle": "Calculez et convertissez tout, partout. Calculatrice scientifique, convertisseur d'unités, convertisseur de devises — tout en un seul endroit.",
    "home.openCalculator": "Ouvrir la Calculatrice",
    "home.convertUnits": "Convertir des Unités",
    "home.allTools": "Tous les Outils Dont Vous Avez Besoin",
    "home.whyUs": "Pourquoi CalcOnline ?",
    "home.fast": "Ultra Rapide",
    "home.fastDesc": "Calculs instantanés sans écran de chargement. Fonctionne hors ligne.",
    "home.free": "100% Gratuit",
    "home.freeDesc": "Pas d'inscription, pas d'abonnement, pas de niveau premium. Tous les outils sont gratuits.",
    "home.everywhere": "Fonctionne Partout",
    "home.everywhereDesc": "Design responsive qui fonctionne sur mobile, tablette et ordinateur.",
    "common.history": "Historique",
    "common.show": "Afficher",
    "common.hide": "Masquer",
    "common.clear": "Tout Effacer",
    "common.exportCSV": "Exporter CSV",
    "common.from": "De",
    "common.to": "Vers",
    "common.swap": "Échanger",
    "common.result": "Résultat",
    "common.calculate": "Calculer",
    "common.solve": "Résoudre",
    "common.features": "Fonctionnalités",
    "footer.tools": "Outils",
    "footer.about": "À propos",
    "footer.rights": "Tous droits réservés.",
    "footer.description": "La meilleure plateforme gratuite de calculatrice et convertisseur.",
  },
  hi: {
    "nav.calculator": "कैलकुलेटर",
    "nav.scientific": "वैज्ञानिक",
    "nav.unitConverter": "इकाई कनवर्टर",
    "nav.currencyConverter": "मुद्रा",
    "nav.more": "और उपकरण",
    "home.title": "सर्वश्रेष्ठ मुफ्त कैलकुलेटर और कनवर्टर",
    "home.subtitle": "कहीं भी, कुछ भी गणना और रूपांतरण करें। वैज्ञानिक कैलकुलेटर, इकाई कनवर्टर, मुद्रा कनवर्टर — सब एक जगह।",
    "home.openCalculator": "कैलकुलेटर खोलें",
    "home.convertUnits": "इकाइयाँ बदलें",
    "home.allTools": "सभी आवश्यक उपकरण",
    "home.whyUs": "CalcOnline क्यों?",
    "home.fast": "बिजली की तेज़ी",
    "home.fastDesc": "बिना लोडिंग स्क्रीन के तुरंत गणना। ऑफ़लाइन भी काम करता है।",
    "home.free": "100% मुफ्त",
    "home.freeDesc": "कोई साइनअप नहीं, कोई सब्सक्रिप्शन नहीं। सभी उपकरण पूरी तरह मुफ्त हैं।",
    "home.everywhere": "हर जगह काम करता है",
    "home.everywhereDesc": "मोबाइल, टैबलेट और डेस्कटॉप पर काम करने वाला रिस्पॉन्सिव डिज़ाइन।",
    "common.history": "इतिहास",
    "common.show": "दिखाएं",
    "common.hide": "छिपाएं",
    "common.clear": "सब हटाएं",
    "common.exportCSV": "CSV निर्यात",
    "common.from": "से",
    "common.to": "को",
    "common.swap": "बदलें",
    "common.result": "परिणाम",
    "common.calculate": "गणना करें",
    "common.solve": "हल करें",
    "common.features": "विशेषताएं",
    "footer.tools": "उपकरण",
    "footer.about": "के बारे में",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.description": "सर्वश्रेष्ठ मुफ्त कैलकुलेटर और कनवर्टर प्लेटफ़ॉर्म।",
  },
  zh: {
    "nav.calculator": "计算器",
    "nav.scientific": "科学计算器",
    "nav.unitConverter": "单位转换",
    "nav.currencyConverter": "货币转换",
    "nav.more": "更多工具",
    "home.title": "终极免费计算器和转换器",
    "home.subtitle": "随时随地计算和转换。科学计算器、单位转换器、货币转换器——一站式服务。免费、快速、无需注册。",
    "home.openCalculator": "打开计算器",
    "home.convertUnits": "转换单位",
    "home.allTools": "您需要的所有工具",
    "home.whyUs": "为什么选择CalcOnline？",
    "home.fast": "闪电般快速",
    "home.fastDesc": "无加载屏幕的即时计算。离线也能使用。",
    "home.free": "100%免费",
    "home.freeDesc": "无需注册、无需订阅、无高级版。所有工具完全免费。",
    "home.everywhere": "随处可用",
    "home.everywhereDesc": "响应式设计，适用于手机、平板和电脑。可安装为应用。",
    "common.history": "历史记录",
    "common.show": "显示",
    "common.hide": "隐藏",
    "common.clear": "全部清除",
    "common.exportCSV": "导出CSV",
    "common.from": "从",
    "common.to": "到",
    "common.swap": "交换",
    "common.result": "结果",
    "common.calculate": "计算",
    "common.solve": "求解",
    "common.features": "特性",
    "footer.tools": "工具",
    "footer.about": "关于",
    "footer.rights": "保留所有权利。",
    "footer.description": "终极免费计算器和转换器平台。随时随地计算和转换。",
  },
  ar: {
    "nav.calculator": "آلة حاسبة",
    "nav.scientific": "علمية",
    "nav.unitConverter": "محول الوحدات",
    "nav.currencyConverter": "العملات",
    "nav.more": "أدوات أخرى",
    "home.title": "أفضل آلة حاسبة ومحول مجاني",
    "home.subtitle": "احسب وحوّل أي شيء في أي مكان. آلة حاسبة علمية، محول وحدات، محول عملات — كل شيء في مكان واحد.",
    "home.openCalculator": "فتح الآلة الحاسبة",
    "home.convertUnits": "تحويل الوحدات",
    "home.allTools": "جميع الأدوات التي تحتاجها",
    "home.whyUs": "لماذا CalcOnline؟",
    "home.fast": "سريع جداً",
    "home.fastDesc": "حسابات فورية بدون شاشات تحميل. يعمل بدون إنترنت أيضاً.",
    "home.free": "مجاني 100%",
    "home.freeDesc": "بدون تسجيل، بدون اشتراكات. جميع الأدوات مجانية بالكامل.",
    "home.everywhere": "يعمل في كل مكان",
    "home.everywhereDesc": "تصميم متجاوب يعمل على الهاتف والتابلت والحاسوب.",
    "common.history": "السجل",
    "common.show": "عرض",
    "common.hide": "إخفاء",
    "common.clear": "مسح الكل",
    "common.exportCSV": "تصدير CSV",
    "common.from": "من",
    "common.to": "إلى",
    "common.swap": "تبديل",
    "common.result": "النتيجة",
    "common.calculate": "احسب",
    "common.solve": "حل",
    "common.features": "الميزات",
    "footer.tools": "الأدوات",
    "footer.about": "حول",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.description": "أفضل منصة مجانية للآلة الحاسبة والمحول.",
  },
};

export function getTranslation(locale: Locale, key: keyof TranslationKeys): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}

export function t(locale: Locale, key: keyof TranslationKeys): string {
  return getTranslation(locale, key);
}
