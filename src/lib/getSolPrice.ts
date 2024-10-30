import axios from 'axios';

import { PRICE_API, WSOL } from '../constants';

// Fetch sol price from CoinGecko API
export const getSolPrice = async (): Promise<number> => {
  try {
    const tokenAPrice = (await axios.get(PRICE_API)).data;
    return parseFloat(tokenAPrice.data.attributes.token_prices[WSOL]);
  } catch (e) {
    console.error(e);
    console.error('Error while fetching SOL Price');
    return 0;
  }
};
