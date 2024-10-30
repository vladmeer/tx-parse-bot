import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

import { MAINNET_RPC } from '../constants';

export const solConnection = new Connection(MAINNET_RPC);

export const validatePublicKey = (address: string) => {
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{43,44}$/; // Base58 regex for Solana
  return base58Regex.test(address);
};

export const validateTransactionSignature = (signature: string) => {
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{87,88}$/; // Base58 regex for Solana transaction signatures
  return base58Regex.test(signature);
};

// Note: these utils are not consider integer overflow. may need to update for the cases
export const fromDecimals = (
  amount: string | BigInt | number,
  decimals: number = 9
): number => {
  return (parseInt(amount.toString()) * 1.0) / 10 ** decimals;
};

export const toDecimals = (amount: number, decimals: number = 9): string => {
  return (amount * 10 ** decimals).toString();
};
