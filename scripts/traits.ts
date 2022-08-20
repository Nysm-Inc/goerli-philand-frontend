import axios from "axios";
import { writeFileSync } from "fs";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { ObjectContractAddress, WallpaperContractAddress } from "~/types";
import { objectMetadataList, ObjectTraits } from "~/types/object";

let objectTraisList: { [contract in ObjectContractAddress | WallpaperContractAddress]: { [tokenId: number]: ObjectTraits } } = {
  [QUEST_OBJECT_CONTRACT_ADDRESS]: {},
  [FREE_OBJECT_CONTRACT_ADDRESS]: {},
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: {},
  [WALLPAPER_CONTRACT_ADDRESS]: {},
};

const setTraits = async () => {
  await Promise.all(
    Object.keys(objectMetadataList).map((key) => {
      const contract = key as ObjectContractAddress | WallpaperContractAddress;
      Object.values(objectMetadataList[contract]).map(async (meta) => {
        const res = await axios.get<ObjectTraits>(meta.json_url);
        objectTraisList = {
          ...objectTraisList,
          [key]: {
            ...objectTraisList[contract],
            [meta.tokenId]: res.data,
          },
        };
      });
    })
  );

  writeFileSync("data/traits.json", JSON.stringify(objectTraisList));
};
setTraits();
