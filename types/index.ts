import FreeObjectAbi from "~/abi/freeobject.json";
import QuestObjectAbi from "~/abi/questobject.json";
import PremiumObjectAbi from "~/abi/premiumobject.json";
import WallpaperAbi from "~/abi/wallpaper.json";
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

export type WallpaperContractAddress = typeof WALLPAPER_CONTRACT_ADDRESS;

export type ShopItemContractAddress =
  | typeof FREE_OBJECT_CONTRACT_ADDRESS
  | typeof PREMIUM_OBJECT_CONTRACT_ADDRESS
  | typeof WALLPAPER_CONTRACT_ADDRESS;

export const ContractAbis = {
  [QUEST_OBJECT_CONTRACT_ADDRESS]: QuestObjectAbi,
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
