import GameInstance from "./GameInstance";
import Engine from "./engine/Engine";
import Room from "./room/Room";

export default class Game {
  engine: Engine;
  room: Room;

  constructor() {
    this.engine = new Engine(this.onMouseMove, this.onMouseClick);
    this.room = new Room();
  }

  loadGame() {
    const { room } = GameInstance.get();
    room.enterRoom();
  }

  onMouseMove = (x: number, y: number) => {
    this.room.handleMouseMovement(x, y);
  };

  onMouseClick = (x: number, y: number) => {
    this.room.handleMouseClick(x, y);
  };
}
