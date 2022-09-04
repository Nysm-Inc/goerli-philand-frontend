import GameInstance from "./GameInstance";
import Engine from "./engine/Engine";
import Room from "./room/Room";
import UIManager, { UIManagerHandler } from "./ui/UIManager";

export default class Game {
  engine: Engine;
  room: Room;
  uiManager: UIManager;

  loaded: boolean;

  constructor() {
    this.engine = new Engine(this.onMouseMove, this.onMouseClick);
    this.room = new Room();
    this.uiManager = new UIManager();
    this.loaded = false;
  }

  async loadGame(handler?: UIManagerHandler) {
    if (this.loaded) return;

    const { engine, room, uiManager } = GameInstance.get();
    if (handler) uiManager.loadUIHandler(handler);
    return Promise.all([room.initialize(), engine.loadGlobalTextures()]).then(() => {
      this.loaded = true;
    });
  }

  onMouseMove = (x: number, y: number) => {
    this.room.handleMouseMovement(x, y);
  };

  onMouseClick = (x: number, y: number) => {
    this.room.handleMouseClick(x, y);
  };
}
