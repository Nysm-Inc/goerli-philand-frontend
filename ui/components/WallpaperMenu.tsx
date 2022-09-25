import { FC, useMemo, useState } from "react";
import { Menu, Modal, ModalContent } from "@chakra-ui/react";
import { Wallpaper, WallpaperContractAddress } from "~/types";
import { objectMetadataList } from "~/types/object";
import MenuList from "./common/MenuList";

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
  balanceWallpapers: Wallpaper[];
  onClose: () => void;
  onChangeWallpaper: (contract: WallpaperContractAddress, tokenId: number) => void;
}> = ({ state, onClose, onChangeWallpaper, currentWallpaper, balanceWallpapers }) => {
  const uniqueWallpapers: Wallpaper[] = useMemo(() => {
    return Array.from(new Set(currentWallpaper ? [...balanceWallpapers, currentWallpaper] : balanceWallpapers));
  }, [currentWallpaper, balanceWallpapers.length]);

  if (uniqueWallpapers.length <= 0) {
    return <></>;
  }
  return (
    <Modal isOpen={state.isShown} onClose={onClose}>
      <ModalContent position="absolute" left={state.x} top={state.y - 64 * 2}>
        <Menu isOpen={state.isShown}>
          <MenuList
            w="243px"
            maxH="176px"
            options={uniqueWallpapers.map((w) => ({
              label: objectMetadataList[w.contract][w.tokenId].name,
              value: w.toString(),
              image: objectMetadataList[w.contract][w.tokenId].image_url,
              onClick: () => {
                onChangeWallpaper(w.contract, w.tokenId);
                onClose();
              },
            }))}
          />
        </Menu>
      </ModalContent>
    </Modal>
  );
};

export default WallpaperMenu;
