export type PhiObject = {
  contractAddress: string;
  tokenId: number;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
};

export type IObject = {
  contractAddress: string;
  tokenId: number;
  sizeX: number;
  sizeY: number;
};

export type DepositObject = {
  contractAddress: string;
  tokenId: number;
  amount: number;
  used: number;
  timestamp: number;
};

export type BalanceObject = {
  contract: string;
  tokenId: number;
  amount: number;
};
