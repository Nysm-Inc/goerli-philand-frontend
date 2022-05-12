import Game from "./Game";

export default class GameInstance {
  static _gameInstance: Game;
  static get(): Game {
    if (!this._gameInstance) {
      this._gameInstance = new Game();
    }
    return this._gameInstance;
  }
}
