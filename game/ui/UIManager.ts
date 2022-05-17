export default class UIManager {
  onOpenActionMenu: (globalX: number, globalY: number) => void;
  // onMoveObject: () => void;

  constructor() {
    this.onOpenActionMenu = (globalX: number, globalY: number) => {};
  }

  loadUIHandler(onOpenActionMenu: (globalX: number, globalY: number) => void) {
    this.onOpenActionMenu = onOpenActionMenu;
  }
}
