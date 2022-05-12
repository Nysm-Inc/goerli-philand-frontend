import { AnimatedSprite, Container, Loader, Point, Spritesheet } from "pixi.js";
import GameInstance from "~/game/GameInstance";

export default class Room {
  container: Container;

  constructor() {
    this.container = new Container();
    this.container.sortableChildren = true;
  }

  enterRoom() {
    const { engine } = GameInstance.get();
    this.container.x = engine.app.renderer.width / 2;
    this.container.y = engine.app.renderer.height / 2;
    engine.app.stage.addChild(this.container);
  }

  handleMouseMovement(globalX: number, globalY: number) {
    //
  }

  handleMouseClick(globalX: number, globalY: number) {
    //
  }
}
