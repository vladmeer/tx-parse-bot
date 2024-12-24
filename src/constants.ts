import dotenv from 'dotenv';
dotenv.config();

export const WSOL = 'So11111111111111111111111111111111111111112';

export const RAY_LP_V4 = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8';

export const PRICE_API = `https://api.geckoterminal.com/api/v2/simple/networks/solana/token_price/${WSOL}`;

export const MAINNET_RPC =
process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com';
