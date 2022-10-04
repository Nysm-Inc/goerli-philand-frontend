import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";

export type ObjectContractAddress =
  | typeof QUEST_OBJECT_CONTRACT_ADDRESS
  | typeof FREE_OBJECT_CONTRACT_ADDRESS
  | typeof PREMIUM_OBJECT_CONTRACT_ADDRESS;

export type WallpaperContractAddress = typeof QUEST_OBJECT_CONTRACT_ADDRESS | typeof WALLPAPER_CONTRACT_ADDRESS;

export type ShopItemContractAddress =
  | typeof FREE_OBJECT_CONTRACT_ADDRESS
  | typeof PREMIUM_OBJECT_CONTRACT_ADDRESS
  | typeof WALLPAPER_CONTRACT_ADDRESS;

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
  contract: WallpaperContractAddress;
  tokenId: number;
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
};

export type BalanceObject = {
  contract: ObjectContractAddress | WallpaperContractAddress;
  tokenId: number;
  amount: number;
};

export const nullAddress = "0x0000000000000000000000000000000000000000";
