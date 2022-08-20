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

const getMetadata = async (
  contract: ObjectContractAddress | WallpaperContractAddress,
  tokenId: number,
  url: string
): Promise<{ contract: ObjectContractAddress | WallpaperContractAddress; tokenId: number; data: ObjectTraits }> => {
  const res = await axios.get<ObjectTraits>(url);
  return { contract, tokenId, data: res.data };
};

const setTraits = async () => {
  const requests: Promise<{ contract: ObjectContractAddress | WallpaperContractAddress; tokenId: number; data: ObjectTraits }>[] = [];
  Object.keys(objectMetadataList).forEach((key) => {
    const contract = key as ObjectContractAddress | WallpaperContractAddress;
    Object.values(objectMetadataList[contract]).forEach((meta) => {
      requests.push(getMetadata(contract, meta.tokenId, meta.json_url));
    });
  });

  const res = await Promise.all(requests);
  res.forEach((meta) => {
    objectTraisList = {
      ...objectTraisList,
      [meta.contract]: {
        ...objectTraisList[meta.contract],
        [meta.tokenId]: meta.data,
      },
    };
  });

  writeFileSync("data/traits.json", JSON.stringify(objectTraisList));
};
setTraits();
