import { FREE_OBJECT_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS } from "~/constants";

export type ObjectContractAddress =
  | typeof PHI_OBJECT_CONTRACT_ADDRESS
  | typeof FREE_OBJECT_CONTRACT_ADDRESS
  | typeof PREMIUM_OBJECT_CONTRACT_ADDRESS;

export type PhiObject = {
  contractAddress: ObjectContractAddress;
  tokenId: number;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
};

export type IObject = {
  contractAddress: ObjectContractAddress;
  tokenId: number;
  sizeX: number;
  sizeY: number;
};

export type DepositObject = {
  contractAddress: ObjectContractAddress;
  tokenId: number;
  amount: number;
  used: number;
  timestamp?: number;
};

export type BalanceObject = {
  contract: ObjectContractAddress;
  tokenId: number;
  amount: number;
};
