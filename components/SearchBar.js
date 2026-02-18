import { useState } from "react";

export default function SearchBar({ onResult }) {
  const [mint, setMint] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mint })
    });

    const data = await res.json();
    onResult(data);

    setLoading(false);
  };

  return (
    <div>
      <input
        value={mint}
        onChange={(e) => setMint(e.target.value)}
        placeholder="Paste Pump.fun mint address"
        style={{ width: "400px", padding: "10px" }}
      />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
