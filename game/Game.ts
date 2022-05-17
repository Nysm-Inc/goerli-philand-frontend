import GameInstance from "./GameInstance";
import Engine from "./engine/Engine";
import Room from "./room/Room";
import UIManager from "./ui/UIManager";

export default class Game {
  engine: Engine;
  room: Room;
  uiManager: UIManager;

  constructor() {
    this.engine = new Engine(this.onMouseMove, this.onMouseClick);
    this.room = new Room();
    this.uiManager = new UIManager();
  }

  loadGame(onOpenActionMenu: (globalX: number, globalY: number) => void) {
    const { room, uiManager } = GameInstance.get();
    uiManager.loadUIHandler(onOpenActionMenu);
    room.enterRoom();
  }

  onMouseMove = (x: number, y: number) => {
    this.room.handleMouseMovement(x, y);
  };

  onMouseClick = (x: number, y: number) => {
    this.room.handleMouseClick(x, y);
  };
}
