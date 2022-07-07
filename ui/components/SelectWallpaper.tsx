import { FC, useEffect, useState } from "react";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { BalanceObject, Wallpaper } from "~/types";
import { objectMetadataList } from "~/types/object";
import SelectBox from "./SelectBox";

const SelectWallpaper: FC<{
  currentWallpaper?: Wallpaper;
  wallpapers: BalanceObject[];
  onChange: (tokenId: number) => void;
  onWithdraw: () => Promise<any>;
}> = ({ currentWallpaper, wallpapers, onChange, onWithdraw }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper?.tokenId || 0);

  useEffect(() => {
    setSelectedWallpaper(currentWallpaper?.tokenId || 0);
  }, [currentWallpaper?.tokenId]);

  return (
    <SelectBox
      w="136px"
      menuW="160px"
      options={[
        ...wallpapers.map((wallpaper) => ({
          label: objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][wallpaper.tokenId].name,
          value: wallpaper.tokenId.toString(),
        })),
        ...(currentWallpaper?.tokenId
          ? [
              {
                label: objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][currentWallpaper.tokenId].name,
                value: currentWallpaper.tokenId.toString(),
              },
              {
                label: "default",
                value: "default",
                onClick: () => {
                  onWithdraw().then(() => {
                    onChange(0);
                    setSelectedWallpaper(0);
                  });
                },
              },
            ]
          : [
              {
                label: "default",
                value: "default",
                onClick: () => {
                  onWithdraw().then(() => {
                    onChange(0);
                    setSelectedWallpaper(0);
                  });
                },
              },
            ]),
      ]}
      selected={{
        label: selectedWallpaper ? objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][selectedWallpaper]?.name : "default",
        value: selectedWallpaper.toString() || "default",
      }}
      handleChange={(v) => {
        onChange(Number(v));
        setSelectedWallpaper(Number(v));
      }}
    />
  );
};

export default SelectWallpaper;
