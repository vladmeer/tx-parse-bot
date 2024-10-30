export const getWalletBalanceError = (msg: string) => {
  return `Couldn't get wallet balance!\n
  Error: ${msg}`;
};

export const parseSwapError = (msg: string) => {
  return `Couldn't parse tx!\n
  Error: ${msg}`;
};
