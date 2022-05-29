export type PhiObject = {
  contractAddress: string;
  tokenId: number;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
};

export type Balance = { contract: string; tokenId: number; amount: number };
