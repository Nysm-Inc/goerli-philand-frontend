import { FREE_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS, WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { ShopItemContractAddress } from "~/types";
import { ObjectMetadata, objectMetadataList } from "~/types/object";

export type Item = ObjectMetadata & { select: number };

export type Items = {
  [FREE_OBJECT_CONTRACT_ADDRESS]: Item[];
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: Item[];
  [WALLPAPER_CONTRACT_ADDRESS]: Item[];
};

const _defaultItems = (contract: ShopItemContractAddress): Item[] => {
  return Object.values(objectMetadataList[contract]).map((metadata) => ({ ...metadata, select: 0 }));
};

export const defaultItems = () => ({
  [FREE_OBJECT_CONTRACT_ADDRESS]: _defaultItems(FREE_OBJECT_CONTRACT_ADDRESS),
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: _defaultItems(PREMIUM_OBJECT_CONTRACT_ADDRESS),
  [WALLPAPER_CONTRACT_ADDRESS]: _defaultItems(WALLPAPER_CONTRACT_ADDRESS),
});

export const tabIdx2Contract: { [idx: number]: ShopItemContractAddress } = {
  0: FREE_OBJECT_CONTRACT_ADDRESS,
  1: PREMIUM_OBJECT_CONTRACT_ADDRESS,
  2: WALLPAPER_CONTRACT_ADDRESS,
};

export const newShopIds: { contract: string; tokenId: number }[] = [
  { contract: PREMIUM_OBJECT_CONTRACT_ADDRESS, tokenId: 26 },
  { contract: PREMIUM_OBJECT_CONTRACT_ADDRESS, tokenId: 27 },
  { contract: PREMIUM_OBJECT_CONTRACT_ADDRESS, tokenId: 28 },
  { contract: PREMIUM_OBJECT_CONTRACT_ADDRESS, tokenId: 29 },
  { contract: PREMIUM_OBJECT_CONTRACT_ADDRESS, tokenId: 30 },
  { contract: PREMIUM_OBJECT_CONTRACT_ADDRESS, tokenId: 35 },
  { contract: PREMIUM_OBJECT_CONTRACT_ADDRESS, tokenId: 36 },
];
