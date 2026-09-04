```tsx
import { useState } from "react";
import { tradingApi } from "../api/trading";

type AnalysisData = Record<string, unknown>;

export function TradeAnalysis() {
  const [id, setId] = useState("");
  const [data, setData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState("");

  async function load() {
    const runId = id.trim();

    if (!runId) {
      setData(null);
      setError("Enter a Run ID");
      return;
    }

    try {
      setError("");

      const result = await tradingApi.analysis(runId);

      if (result !== null && typeof result === "object") {
        setData(result as AnalysisData);
      } else {
        setData({ result });
      }
    } catch (e: unknown) {
      setData(null);
      setError(
        e instanceof Error
          ? e.message
          : "Run not found"
      );
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
            onChange={(event) => setId(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                void load();
              }
            }}
            placeholder="Run ID"
            aria-label="Run ID"
          />

          <button
            type="button"
            onClick={() => {
              void load();
            }}
          >
            Load
          </button>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

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
