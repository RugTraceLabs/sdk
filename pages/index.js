import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>RugTrace</h1>
      <p>
        Paste any Pump.fun token mint address to visualize creator wallets
        and detect rug patterns.
      </p>

      <SearchBar onResult={setResult} />
      <ResultCard data={result} />
    </div>
  );
}
