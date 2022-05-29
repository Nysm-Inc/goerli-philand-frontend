export default class UIManager {
  onOpenActionMenu: (id: string, globalX: number, globalY: number) => void;
  // onMoveObject: () => void;

  constructor() {
    this.onOpenActionMenu = (id: string, globalX: number, globalY: number) => {};
  }

  loadUIHandler(onOpenActionMenu: (id: string, globalX: number, globalY: number) => void) {
    this.onOpenActionMenu = onOpenActionMenu;
  }
}
