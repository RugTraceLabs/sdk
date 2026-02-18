import { analyzeMint } from "../../lib/solana";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { mint } = req.body;

  if (!mint) {
    return res.status(400).json({ error: "Mint address required" });
  }

  try {
    const result = await analyzeMint(mint);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
