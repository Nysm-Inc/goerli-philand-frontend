import { FC, useMemo, useState } from "react";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { Wallpaper, WallpaperContractAddress } from "~/types";
import { objectMetadataList } from "~/types/object";
import SelectBox from "./common/SelectBox";

const SelectWallpaper: FC<{
  currentWallpaper?: Wallpaper;
  balanceWallpapers: Wallpaper[];
  disabled?: boolean;
  onChange: (contract: WallpaperContractAddress, tokenId: number) => void;
}> = ({ currentWallpaper, balanceWallpapers, disabled, onChange }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);
  const uniqueWallpapers: Wallpaper[] = useMemo(() => {
    return Array.from(new Set(currentWallpaper ? [...balanceWallpapers, currentWallpaper] : balanceWallpapers));
  }, [currentWallpaper, balanceWallpapers.length]);

  return (
    <SelectBox
      w="82px"
      menuW="243px"
      menuMaxH="176px"
      options={uniqueWallpapers.map((w) => ({
        label: objectMetadataList[w.contract][w.tokenId].name,
        value: JSON.stringify(w),
        image: objectMetadataList[w.contract][w.tokenId].image_url,
        onClick: () => {
          onChange(w.contract, w.tokenId);
          setSelectedWallpaper(w);
        },
      }))}
      selected={{
        label: selectedWallpaper ? objectMetadataList[selectedWallpaper.contract][selectedWallpaper.tokenId].name : "",
        value: selectedWallpaper ? JSON.stringify(selectedWallpaper) : "",
        image: selectedWallpaper
          ? objectMetadataList[selectedWallpaper.contract][selectedWallpaper.tokenId].image_url
          : objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][1].image_url,
      }}
      disabled={disabled}
    />
  );
};

export default SelectWallpaper;
