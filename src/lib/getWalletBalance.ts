import { PublicKey } from '@solana/web3.js';

import { getSolPrice } from './getSolPrice';
import { fromDecimals, solConnection } from '../utils';

export interface GetWalletBalanceProps {
  solAmount: number;
  solValue: number;
}

export const getWalletBalance = async (
  address: string
): Promise<GetWalletBalanceProps> => {
  const wallet = new PublicKey(address);

  const balanceInLamports = await solConnection.getBalance(wallet);

  const solAmount = fromDecimals(balanceInLamports);

  const solPrice = await getSolPrice();

  return {
    solAmount,
    solValue: solAmount * solPrice,
  };
};
