```tsx
import { useState } from "react";
import { tradingApi } from "../api/trading";

type AnalysisData = Record<string, unknown>;

export function TradeAnalysis() {
  const [id, setId] = useState("");
  const [data, setData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState("");

  async function load() {
    if (!id.trim()) {
      setError("Enter a Run ID");
      setData(null);
      return;
    }

    try {
      setError("");
      const result = await tradingApi.analysis(id.trim());

      setData(
        result && typeof result === "object"
          ? (result as AnalysisData)
          : { result }
      );
    } catch (e) {
      setData(null);
      setError(e instanceof Error ? e.message : "Run not found");
    }
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">TRADE ANALYSIS</div>
          <h2>Inspect the complete decision chain</h2>
        </div>
      </div>

      <section className="panel">
        <div className="search">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Run ID"
            aria-label="Run ID"
          />

          <button type="button" onClick={load}>
            Load
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {data !== null && (
          <pre className="json">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </section>
    </div>
  );
}
```
