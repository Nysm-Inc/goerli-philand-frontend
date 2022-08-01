import { FC, useState } from "react";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { objectMetadataList } from "~/types/object";
import SelectBox from "./SelectBox";

const SelectWallpaper: FC<{
  wallpapers: number[];
  currentWallpaper?: number;
  disabled?: boolean;
  onChange: (tokenId: number) => void;
}> = ({ wallpapers, currentWallpaper, disabled, onChange }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);

  return (
    <SelectBox
      w="136px"
      menuW="160px"
      options={wallpapers.map((tokenId) => ({
        label: objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][tokenId].name,
        value: tokenId.toString(),
      }))}
      selected={{
        label: selectedWallpaper ? objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][selectedWallpaper].name : "",
        value: selectedWallpaper ? selectedWallpaper.toString() : "",
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
