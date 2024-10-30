export interface ParseRaydiumSwapProps {
  solAmount: number;
  solValue: number;
}

export const parseRaydiumSwap = async (
  signature: string
): Promise<ParseRaydiumSwapProps> => {
  return {
    solAmount: 0,
    solValue: 0,
  };
};
