import { FC, useContext, useMemo, useState } from "react";
import { Menu, Modal, ModalContent } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { BalanceObject, Wallpaper } from "~/types";
import MenuList, { Option } from "./MenuList";
import { objectMetadataList } from "~/types/object";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";

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
  isApprovedWallpaper: boolean;
  currentWallpaper?: Wallpaper;
  balanceWallpapers: BalanceObject[];
  onClose: () => void;
  onChangeWallpaper: (tokenId: number) => void;
}> = ({ state, onClose, onChangeWallpaper, isApprovedWallpaper, currentWallpaper, balanceWallpapers }) => {
  const { colorMode } = useContext(AppContext);
  const uniqueWallpapers = useMemo(() => {
    return Array.from(
      new Set(
        currentWallpaper?.tokenId
          ? [...balanceWallpapers.map((wallpaper) => wallpaper.tokenId), currentWallpaper?.tokenId]
          : [...balanceWallpapers.map((wallpaper) => wallpaper.tokenId)]
      )
    );
  }, [currentWallpaper?.tokenId, balanceWallpapers.length]);

  if (!isApprovedWallpaper) {
    return <></>;
  }
  return (
    <Modal isOpen={state.isShown} onClose={onClose}>
      <ModalContent
        w="176px"
        h="64px"
        position="absolute"
        p="8px"
        borderRadius="20px"
        boxShadow={colorMode === "light" ? "-2px 4px 8px rgba(13, 13, 13, 0.1)" : "4px 4px 0px rgba(26, 26, 26, 0.15);"}
        border={colorMode === "light" ? "1px solid" : "none"}
        borderColor="light.g_orange"
        bgColor={colorMode === "light" ? "white" : "grey.900"}
        left={state.x}
        top={state.y - 64 * 2}
      >
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
