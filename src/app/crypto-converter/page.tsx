"use client";

import { useState, useEffect, useMemo } from "react";
import AdBanner from "@/components/AdBanner";

type CryptoData = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
};

const FIAT_CURRENCIES = ["usd", "eur", "gbp", "jpy", "cad", "aud", "chf", "cny", "inr", "brl"];
const FIAT_SYMBOLS: Record<string, string> = {
  usd: "$", eur: "€", gbp: "£", jpy: "¥", cad: "C$", aud: "A$", chf: "CHF", cny: "¥", inr: "₹", brl: "R$",
};

// Fallback data
const fallbackCryptos: CryptoData[] = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 65000, price_change_percentage_24h: 1.2, market_cap: 1270000000000, image: "" },
  { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 3500, price_change_percentage_24h: -0.5, market_cap: 420000000000, image: "" },
  { id: "tether", symbol: "usdt", name: "Tether", current_price: 1, price_change_percentage_24h: 0.01, market_cap: 100000000000, image: "" },
  { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 580, price_change_percentage_24h: 0.8, market_cap: 86000000000, image: "" },
  { id: "solana", symbol: "sol", name: "Solana", current_price: 145, price_change_percentage_24h: 2.1, market_cap: 63000000000, image: "" },
  { id: "ripple", symbol: "xrp", name: "XRP", current_price: 0.62, price_change_percentage_24h: -1.3, market_cap: 34000000000, image: "" },
  { id: "usd-coin", symbol: "usdc", name: "USD Coin", current_price: 1, price_change_percentage_24h: 0, market_cap: 32000000000, image: "" },
  { id: "cardano", symbol: "ada", name: "Cardano", current_price: 0.58, price_change_percentage_24h: 0.9, market_cap: 20000000000, image: "" },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", current_price: 0.12, price_change_percentage_24h: 3.2, market_cap: 17000000000, image: "" },
  { id: "avalanche-2", symbol: "avax", name: "Avalanche", current_price: 35, price_change_percentage_24h: 1.5, market_cap: 13000000000, image: "" },
  { id: "polkadot", symbol: "dot", name: "Polkadot", current_price: 7.5, price_change_percentage_24h: -0.8, market_cap: 10000000000, image: "" },
  { id: "chainlink", symbol: "link", name: "Chainlink", current_price: 16, price_change_percentage_24h: 0.4, market_cap: 9400000000, image: "" },
  { id: "tron", symbol: "trx", name: "TRON", current_price: 0.13, price_change_percentage_24h: 0.2, market_cap: 11000000000, image: "" },
  { id: "matic-network", symbol: "matic", name: "Polygon", current_price: 0.82, price_change_percentage_24h: -1.1, market_cap: 7600000000, image: "" },
  { id: "litecoin", symbol: "ltc", name: "Litecoin", current_price: 85, price_change_percentage_24h: 0.6, market_cap: 6300000000, image: "" },
];

export default function CryptoConverterPage() {
  const [cryptos, setCryptos] = useState<CryptoData[]>(fallbackCryptos);
  const [fiat, setFiat] = useState("usd");
  const [fromCrypto, setFromCrypto] = useState("bitcoin");
  const [amount, setAmount] = useState("1");
  const [direction, setDirection] = useState<"crypto-to-fiat" | "fiat-to-crypto">("crypto-to-fiat");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCryptos() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${fiat}&order=market_cap_desc&per_page=50&page=1&sparkline=false`
        );
        if (res.ok) {
          const data = await res.json();
          setCryptos(data);
          setLastUpdated(new Date().toLocaleString());
        }
      } catch {
        setLastUpdated("Using cached prices");
      } finally {
        setLoading(false);
      }
    }
    fetchCryptos();
  }, [fiat]);

  const selectedCrypto = cryptos.find((c) => c.id === fromCrypto) || cryptos[0];

  const result = useMemo(() => {
    const val = parseFloat(amount);
    if (isNaN(val) || !selectedCrypto) return "";
    if (direction === "crypto-to-fiat") {
      return formatMoney(val * selectedCrypto.current_price);
    } else {
      return (val / selectedCrypto.current_price).toFixed(8);
    }
  }, [amount, selectedCrypto, direction]);

  const swap = () => {
    setDirection((d) => (d === "crypto-to-fiat" ? "fiat-to-crypto" : "crypto-to-fiat"));
    if (result) setAmount(result.replace(/,/g, ""));
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Cryptocurrency Converter</h1>
        <p className="text-muted text-center mb-8">
          Convert between 50+ cryptocurrencies with live prices.
        </p>

        <AdBanner slot="crypto-top" format="horizontal" className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-lg">
              {loading && <p className="text-sm text-muted mb-4 text-center">Loading live prices...</p>}

              {/* Fiat selector */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {FIAT_CURRENCIES.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiat(f)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      fiat === f ? "bg-primary text-white" : "bg-btn-bg hover:bg-btn-hover"
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* From */}
              <div className="mb-4">
                <label className="text-sm text-muted mb-1 block">
                  {direction === "crypto-to-fiat" ? "Crypto Amount" : `${fiat.toUpperCase()} Amount`}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary"
                  />
                  {direction === "crypto-to-fiat" ? (
                    <select
                      value={fromCrypto}
                      onChange={(e) => setFromCrypto(e.target.value)}
                      className="bg-display-bg border border-display-border rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-primary min-w-[130px]"
                    >
                      {cryptos.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.symbol.toUpperCase()} — {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="bg-display-bg border border-display-border rounded-xl px-4 py-3 font-medium text-sm flex items-center min-w-[130px]">
                      {FIAT_SYMBOLS[fiat]} {fiat.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Swap */}
              <div className="flex justify-center my-2">
                <button onClick={swap} className="p-2 rounded-full hover:bg-btn-hover transition-colors text-xl" aria-label="Swap">⇅</button>
              </div>

              {/* To */}
              <div className="mb-6">
                <label className="text-sm text-muted mb-1 block">
                  {direction === "crypto-to-fiat" ? `${fiat.toUpperCase()} Value` : "Crypto Amount"}
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-display-bg border border-display-border rounded-xl px-4 py-3 font-mono text-lg">
                    {direction === "crypto-to-fiat" ? `${FIAT_SYMBOLS[fiat]}${result}` : result}
                  </div>
                  {direction === "fiat-to-crypto" ? (
                    <select
                      value={fromCrypto}
                      onChange={(e) => setFromCrypto(e.target.value)}
                      className="bg-display-bg border border-display-border rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-primary min-w-[130px]"
                    >
                      {cryptos.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.symbol.toUpperCase()} — {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="bg-display-bg border border-display-border rounded-xl px-4 py-3 font-medium text-sm flex items-center min-w-[130px]">
                      {FIAT_SYMBOLS[fiat]} {fiat.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Price info */}
              <div className="bg-display-bg border border-display-border rounded-xl p-4 text-sm">
                <p className="font-medium">{selectedCrypto.name} ({selectedCrypto.symbol.toUpperCase()})</p>
                <p className="text-muted">
                  Price: {FIAT_SYMBOLS[fiat]}{formatMoney(selectedCrypto.current_price)}{" "}
                  <span className={selectedCrypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
                    ({selectedCrypto.price_change_percentage_24h >= 0 ? "+" : ""}
                    {selectedCrypto.price_change_percentage_24h.toFixed(2)}%)
                  </span>
                </p>
                {lastUpdated && <p className="text-xs text-muted mt-1">Updated: {lastUpdated}</p>}
              </div>
            </div>
          </div>

          {/* Market table */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card-bg border border-card-border rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Market Prices</h3>
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {cryptos.slice(0, 25).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setFromCrypto(c.id); setDirection("crypto-to-fiat"); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-btn-hover transition-colors ${
                      fromCrypto === c.id ? "bg-btn-bg" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold w-12 text-left">{c.symbol.toUpperCase()}</span>
                      <span className="text-muted text-xs truncate max-w-[100px]">{c.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs">{FIAT_SYMBOLS[fiat]}{formatMoney(c.current_price)}</div>
                      <div className={`text-xs ${c.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {c.price_change_percentage_24h >= 0 ? "+" : ""}{c.price_change_percentage_24h.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4">Free Cryptocurrency Converter</h2>
          <p className="text-muted mb-4">
            Convert between 50+ cryptocurrencies and 10 fiat currencies with live market prices from CoinGecko.
            Track Bitcoin, Ethereum, Solana, and more with real-time 24h price changes.
          </p>
        </section>
      </div>
    </div>
  );
}

function formatMoney(n: number): string {
  if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(2);
  return n.toPrecision(4);
}
