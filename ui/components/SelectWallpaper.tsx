import { FC, useEffect, useState } from "react";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { BalanceObject, Wallpaper } from "~/types";
import { objectMetadataList } from "~/types/object";
import SelectBox from "./SelectBox";

const SelectWallpaper: FC<{
  currentWallpaper?: Wallpaper;
  balanceWallpapers: BalanceObject[];
  disabled?: boolean;
  onChange: (tokenId: number) => void;
}> = ({ currentWallpaper, balanceWallpapers, disabled, onChange }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper?.tokenId || 0);

  useEffect(() => {
    setSelectedWallpaper(currentWallpaper?.tokenId || 0);
  }, [currentWallpaper?.tokenId]);

  return (
    <SelectBox
      w="136px"
      menuW="160px"
      options={[
        ...balanceWallpapers.map((wallpaper) => ({
          label: objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][wallpaper.tokenId]?.name,
          value: wallpaper.tokenId.toString(),
        })),
        ...(currentWallpaper?.tokenId
          ? [
              {
                label: objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][currentWallpaper.tokenId]?.name,
                value: currentWallpaper.tokenId.toString(),
              },
            ]
          : []),
      ]}
      selected={{
        label: selectedWallpaper ? objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][selectedWallpaper]?.name : "",
        value: selectedWallpaper.toString() || "",
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
