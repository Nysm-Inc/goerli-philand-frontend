import axios from "axios";
import { existsSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { ObjectContractAddress, WallpaperContractAddress } from "~/types";
import { objectMetadataList, ObjectTraits } from "~/types/object";

type ContractAddress = ObjectContractAddress | WallpaperContractAddress;

const dir = "./scripts/output";

const pre = () => {
  if (!existsSync(dir)) mkdir(dir, { recursive: true });
};

type OriginObjectTraits = {
  attributes: { trait_type: string; value: string }[];
  name: string;
  description: string;
  collection: {
    family: string;
    name: string;
  };
};

const getTraits = async (
  contract: ObjectContractAddress | WallpaperContractAddress,
  tokenId: number,
  url: string
): Promise<{ contract: ObjectContractAddress | WallpaperContractAddress; tokenId: number; data: OriginObjectTraits }> => {
  const res = await axios.get<OriginObjectTraits>(url);
  return { contract, tokenId, data: res.data };
};

const setTraits = async () => {
  try {
    pre();

    let objectTraits: { [contract in ContractAddress]: { [tokenId: number]: ObjectTraits } } = {
      [QUEST_OBJECT_CONTRACT_ADDRESS]: {},
      [FREE_OBJECT_CONTRACT_ADDRESS]: {},
      [PREMIUM_OBJECT_CONTRACT_ADDRESS]: {},
      [WALLPAPER_CONTRACT_ADDRESS]: {},
    };

    const requests: Promise<{ contract: ContractAddress; tokenId: number; data: OriginObjectTraits }>[] = [];
    (Object.keys(objectMetadataList) as ContractAddress[]).forEach((contract) => {
      Object.values(objectMetadataList[contract]).forEach((meta) => {
        requests.push(getTraits(contract, meta.tokenId, meta.json_url));
      });
    });

    const res = await Promise.all(requests);
    res.forEach((meta) => {
      objectTraits = {
        ...objectTraits,
        [meta.contract]: {
          ...objectTraits[meta.contract],
          [meta.tokenId]: {
            ...meta.data,
            attributes: {
              objectType: meta.data.attributes.find((attr) => attr.trait_type === "object_type")?.value,
              network: meta.data.attributes.find((attr) => attr.trait_type === "network")?.value,
            },
          },
        },
      };
    });

    writeFile(dir + "/traits.json", JSON.stringify(objectTraits));
  } catch (err) {
    console.error(err);
  }
};
setTraits();
