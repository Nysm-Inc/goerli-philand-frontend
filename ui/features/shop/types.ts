import { FREE_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS, WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { ObjectMetadata } from "~/types/object";

export type Item = ObjectMetadata & { select: number };

export type Items = {
  [FREE_OBJECT_CONTRACT_ADDRESS]: Item[];
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: Item[];
  [WALLPAPER_CONTRACT_ADDRESS]: Item[];
};
