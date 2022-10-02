import { ObjectContractAddress, WallpaperContractAddress } from "~/types";
import { objectTraits } from "~/types/object";

export const isWallpaper = (contract: ObjectContractAddress | WallpaperContractAddress, tokenId: number) => {
  return objectTraits[contract][tokenId].attributes.objectType === "Wallpaper";
};
