export type PhiObject = {
  contractAddress: string;
  tokenId: number;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
};

export type Balance = { contract: string; tokenId: number; amount: number };

export type DepositObject = {
  amount: number;
  contractAddress: string;
  timestamp: number;
  tokenId: number;
  used: number;
};

export type WriteObject = {
  contractAddress: string;
  tokenId: number;
  xStart: number;
  yStart: number;
};
