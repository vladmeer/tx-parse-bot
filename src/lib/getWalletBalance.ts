import { PublicKey } from '@solana/web3.js';

import { getSolPrice } from './getSolPrice';
import { fromLamport, solConnection } from '../utils';

export interface GetWalletBalanceProps {
  solAmount: number;
  solValue: number;
}

export const getWalletBalance = async (
  address: string
): Promise<GetWalletBalanceProps> => {
  try {
    const wallet = new PublicKey(address);

    const balanceInLamports = await solConnection.getBalance(wallet);

    const solAmount = fromLamport(balanceInLamports);

    const solPrice = await getSolPrice();

    return {
      solAmount,
      solValue: solAmount * solPrice,
    };
  } catch (e) {
    console.error(e);
    console.log('Error while fetching wallet sol balance');
    return {
      solAmount: 0,
      solValue: 0,
    };
  }
};
