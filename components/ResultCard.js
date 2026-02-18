export default function ResultCard({ data }) {
  if (!data) return null;

  if (data.error) {
    return <p>Error: {data.error}</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Creator Wallet</h3>
      <p>{data.creator}</p>

      <h3>Total Transactions</h3>
      <p>{data.totalTransactions}</p>

      <h3>Early Transactions</h3>
      <ul>
        {data.earlyTransactions.map((tx) => (
          <li key={tx}>{tx}</li>
        ))}
      </ul>
    </div>
  );
}
