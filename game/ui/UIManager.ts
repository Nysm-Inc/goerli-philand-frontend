import { ObjectContractAddress, PhiLink } from "~/types";

export type UIManagerHandler = {
  onOpenActionMenu: (id: string, globalX: number, globalY: number) => void;
  onOpenWallpaperMenu: (globalX: number, globalY: number) => void;
  onChangeLinkMenu: (id: string, link: PhiLink) => void;
  onPlaceFromLand: (contract: ObjectContractAddress, tokenId: number) => void;
  onChangeScaled: (scaled: number) => void;
};

export default class UIManager {
  onOpenActionMenu: (id: string, globalX: number, globalY: number) => void;
  onOpenWallpaperMenu: (globalX: number, globalY: number) => void;
  onChangeLinkMenu: (id: string, link: PhiLink) => void;
  onPlaceFromLand: (contract: ObjectContractAddress, tokenId: number) => void;
  onChangeScaled: (scaled: number) => void;

  constructor() {
    this.onOpenActionMenu = () => {};
    this.onOpenWallpaperMenu = () => {};
    this.onChangeLinkMenu = () => {};
    this.onPlaceFromLand = () => {};
    this.onChangeScaled = () => {};
  }

  loadUIHandler(handler: UIManagerHandler) {
    this.onOpenActionMenu = handler.onOpenActionMenu;
    this.onOpenWallpaperMenu = handler.onOpenWallpaperMenu;
    this.onChangeLinkMenu = handler.onChangeLinkMenu;
    this.onPlaceFromLand = handler.onPlaceFromLand;
    this.onChangeScaled = handler.onChangeScaled;
  }
}
