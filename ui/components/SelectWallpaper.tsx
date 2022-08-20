import { FC, useState } from "react";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { objectMetadataList } from "~/types/object";
import SelectBox from "./common/SelectBox";

const SelectWallpaper: FC<{
  tokenIds: number[];
  currentWallpaper?: number;
  disabled?: boolean;
  onChange: (tokenId: number) => void;
}> = ({ tokenIds, currentWallpaper, disabled, onChange }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);

  return (
    <SelectBox
      w="82px"
      menuW="243px"
      menuMaxH="176px"
      options={tokenIds.map((tokenId) => ({
        label: objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][tokenId].name,
        value: tokenId.toString(),
        image: objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][tokenId].image_url,
      }))}
      selected={{
        label: selectedWallpaper ? objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][selectedWallpaper].name : "",
        value: selectedWallpaper ? selectedWallpaper.toString() : "",
        image: selectedWallpaper
          ? objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][selectedWallpaper].image_url
          : objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][1].image_url,
      }}
      disabled={disabled}
      handleChange={(v) => {
        onChange(Number(v));
        setSelectedWallpaper(Number(v));
      }}
    />
  );
};

export default SelectWallpaper;
