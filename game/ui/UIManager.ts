import { PhiLink } from "~/types";

export type UIManagerHandler = {
  onOpenActionMenu: (id: string, globalX: number, globalY: number) => void;
  onChangeLinkMenu: (id: string, link: PhiLink) => void;
};

export default class UIManager {
  onOpenActionMenu: (id: string, globalX: number, globalY: number) => void;
  onChangeLinkMenu: (id: string, link: PhiLink) => void;

  constructor() {
    this.onOpenActionMenu = () => {};
    this.onChangeLinkMenu = () => {};
  }

  loadUIHandler(handler: UIManagerHandler) {
    this.onOpenActionMenu = handler.onOpenActionMenu;
    this.onChangeLinkMenu = handler.onChangeLinkMenu;
  }
}
