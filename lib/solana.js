import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(process.env.SOLANA_RPC);

export async function analyzeMint(mintAddress) {
  const mintPubkey = new PublicKey(mintAddress);

  // Get signatures
  const signatures = await connection.getSignaturesForAddress(
    mintPubkey,
    { limit: 50 }
  );

  if (!signatures.length) {
    return { error: "No transactions found" };
  }

  // Get first transaction (creator heuristic)
  const firstTx = await connection.getParsedTransaction(
    signatures[signatures.length - 1].signature,
    { maxSupportedTransactionVersion: 0 }
  );

  const creator =
    firstTx?.transaction?.message?.accountKeys[0]?.pubkey?.toString() ||
    "Unknown";

  // Early buyers = first 10 signers
  const earlyBuyers = signatures.slice(0, 10).map((sig) => sig.signature);

  return {
    creator,
    totalTransactions: signatures.length,
    earlyTransactions: earlyBuyers
  };
}
