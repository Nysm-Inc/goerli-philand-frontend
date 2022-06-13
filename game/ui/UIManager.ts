export type UIManagerHandler = {
  onOpenActionMenu?: (id: string, globalX: number, globalY: number) => void;
};

export default class UIManager {
  onOpenActionMenu?: (id: string, globalX: number, globalY: number) => void;

  constructor() {
    this.onOpenActionMenu = (id: string, globalX: number, globalY: number) => {};
  }

  loadUIHandler(handler: UIManagerHandler) {
    this.onOpenActionMenu = handler.onOpenActionMenu;
  }
}
