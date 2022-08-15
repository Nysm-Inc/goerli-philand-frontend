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

export const ContractAbis = {
  [QUEST_OBJECT_CONTRACT_ADDRESS]: QuestObjectAbi,
  [FREE_OBJECT_CONTRACT_ADDRESS]: FreeObjectAbi,
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: PremiumObjectAbi,
  [WALLPAPER_CONTRACT_ADDRESS]: WallpaperAbi,
};
