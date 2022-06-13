import GameInstance from "./GameInstance";
import Engine from "./engine/Engine";
import Room from "./room/Room";
import UIManager, { UIManagerHandler } from "./ui/UIManager";

export default class Game {
  engine: Engine;
  room: Room;
  uiManager: UIManager;

  constructor() {
    this.engine = new Engine(this.onMouseMove, this.onMouseClick);
    this.room = new Room();
    this.uiManager = new UIManager();
  }

  async loadGame(handler: UIManagerHandler) {
    const { engine, room, uiManager } = GameInstance.get();

    return Promise.all([engine.loadGlobalTextures()])
      .then(() => {
        room.initialize();
        uiManager.loadUIHandler(handler);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onMouseMove = (x: number, y: number) => {
    this.room.handleMouseMovement(x, y);
  };

  onMouseClick = (x: number, y: number) => {
    this.room.handleMouseClick(x, y);
  };
}
