import GameInstance from "./GameInstance";
import Engine from "./engine/Engine";

export default class Game {
  engine: Engine;

  constructor() {
    this.engine = new Engine(this.onMouseMove, this.onMouseClick);
  }

  loadGame() {
    //
  }

  onMouseMove = (x: number, y: number) => {
    //
  };

  onMouseClick = (x: number, y: number) => {
    //
  };
}
