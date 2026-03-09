export type HistoryEntry = {
  id: string;
  tool: string;
  expression: string;
  result: string;
  timestamp: number;
};

const STORAGE_KEY = "calconline-history";
const MAX_ENTRIES = 200;

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  history.unshift(newEntry);
  if (history.length > MAX_ENTRIES) history.length = MAX_ENTRIES;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportHistoryCSV(): string {
  const history = getHistory();
  const header = "Date,Tool,Expression,Result";
  const rows = history.map((entry) => {
    const date = new Date(entry.timestamp).toLocaleString();
    const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
    return `${escape(date)},${escape(entry.tool)},${escape(entry.expression)},${escape(entry.result)}`;
  });
  return [header, ...rows].join("\n");
}

export function downloadCSV(): void {
  const csv = exportHistoryCSV();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `calconline-history-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
