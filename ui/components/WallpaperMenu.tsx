import { FC, useMemo, useState } from "react";
import { Menu, Modal, ModalContent } from "@chakra-ui/react";
import { BalanceObject, Wallpaper } from "~/types";
import { objectMetadataList } from "~/types/object";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import MenuList from "./MenuList";

export type WallpaperMenuState = { x: number; y: number; isShown: boolean };
export const defaultWallpaperMenuState = { x: 0, y: 0, isShown: false };

export const useWallpaperMenu = (): [WallpaperMenuState, (x: number, y: number) => void, () => void] => {
  const [state, setState] = useState<WallpaperMenuState>(defaultWallpaperMenuState);
  const onOpen = (x: number, y: number) => setState({ x, y, isShown: true });
  const onClose = () => setState({ ...state, isShown: false });
  return [state, onOpen, onClose];
};

const WallpaperMenu: FC<{
  state: WallpaperMenuState;
  currentWallpaper?: Wallpaper;
  balanceWallpapers: BalanceObject[];
  onClose: () => void;
  onChangeWallpaper: (tokenId: number) => void;
}> = ({ state, onClose, onChangeWallpaper, currentWallpaper, balanceWallpapers }) => {
  const uniqueWallpapers = useMemo(() => {
    return Array.from(
      new Set(
        currentWallpaper?.tokenId
          ? [...balanceWallpapers.map((wallpaper) => wallpaper.tokenId), currentWallpaper?.tokenId]
          : [...balanceWallpapers.map((wallpaper) => wallpaper.tokenId)]
      )
    );
  }, [currentWallpaper?.tokenId, balanceWallpapers.length]);

  if (uniqueWallpapers.length <= 0) {
    return <></>;
  }
  return (
    <Modal isOpen={state.isShown} onClose={onClose}>
      <ModalContent position="absolute" left={state.x} top={state.y - 64 * 2}>
        <Menu isOpen={state.isShown}>
          <MenuList
            w="243px"
            maxH="160px"
            options={uniqueWallpapers.map((w) => ({
              label: objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][w].name,
              value: w.toString(),
              image: objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][w].image_url,
            }))}
            onClick={(v) => {
              onChangeWallpaper(Number(v));
              onClose();
            }}
          />
        </Menu>
      </ModalContent>
    </Modal>
  );
};

export default WallpaperMenu;
