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
import { objectMetadataList } from "~/types/object";

type ContractAddress = ObjectContractAddress | WallpaperContractAddress;

const dir = "./scripts/images";

const dirName: { [contract in ContractAddress]: string } = {
  [QUEST_OBJECT_CONTRACT_ADDRESS]: "quest",
  [FREE_OBJECT_CONTRACT_ADDRESS]: "free",
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: "premium",
  [WALLPAPER_CONTRACT_ADDRESS]: "wallpaper",
};

const pre = () => {
  Object.values(dirName).forEach((name) => {
    const d = dir + "/" + name;
    if (!existsSync(d)) mkdir(d, { recursive: true });
  });
};

const download = async (url: string, output: string) => {
  const raw = await axios.get(url, { responseType: "arraybuffer" });
  const base64 = Buffer.from(raw.data, "binary").toString("base64");
  return writeFile(output, base64, "base64");
};

const downloadObjectImages = async () => {
  try {
    pre();

    let progress = 1;
    const total = Object.values(objectMetadataList).reduce((memo, list) => memo + Object.keys(list).length, 0);
    (Object.keys(objectMetadataList) as ContractAddress[]).forEach((contract) => {
      Object.values(objectMetadataList[contract]).forEach(async (meta) => {
        await download(meta.image_url, `${dir}/${dirName[contract]}/${contract}_${meta.tokenId}.png`);
        console.log("progress: " + progress + "/" + total);
        progress++;
      });
    });
  } catch (err) {
    console.error(err);
  }
};

downloadObjectImages();
