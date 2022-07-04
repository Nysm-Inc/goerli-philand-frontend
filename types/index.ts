import { FreeObjectAbi, PhiObjectAbi, PremiumObjectAbi, WallpaperAbi } from "~/abi";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";

export type ObjectContractAddress =
  | typeof PHI_OBJECT_CONTRACT_ADDRESS
  | typeof FREE_OBJECT_CONTRACT_ADDRESS
  | typeof PREMIUM_OBJECT_CONTRACT_ADDRESS;

export type WallpaperContractAddress = typeof WALLPAPER_CONTRACT_ADDRESS;

export const ContractAbis = {
  [PHI_OBJECT_CONTRACT_ADDRESS]: PhiObjectAbi,
  [FREE_OBJECT_CONTRACT_ADDRESS]: FreeObjectAbi,
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: PremiumObjectAbi,
  [WALLPAPER_CONTRACT_ADDRESS]: WallpaperAbi,
};

export type PhiObject = {
  contractAddress: ObjectContractAddress;
  tokenId: number;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
  link: PhiLink;
};

export type PhiLink = {
  title: string;
  url: string;
};

export type Wallpaper = {
  contractAddress: typeof WALLPAPER_CONTRACT_ADDRESS;
  tokenId: number;
  timestamp?: number;
};

export type IObject = {
  contractAddress: ObjectContractAddress;
  tokenId: number;
  sizeX: number;
  sizeY: number;
  link: PhiLink;
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

export const nullAddress = "0x0000000000000000000000000000000000000000";
