import { Application } from "pixi.js";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH } from "~/constants";
import "./pixelPerfectInteraction";

export default class Engine {
  app: Application;
  onMouseMoveHandler: (mouseX: number, mouseY: number) => void;
  onMouseClickHandler: (mouseX: number, mouseY: number) => void;

  constructor(
    onMouseMove: (mouseX: number, mouseY: number) => void,
    onMouseClick: (mouseX: number, mouseY: number) => void
  ) {
    this.onMouseMoveHandler = onMouseMove;
    this.onMouseClickHandler = onMouseClick;

    this.app = new Application({
      width: GAME_APP_WIDTH,
      height: GAME_APP_HEIGHT,
      backgroundColor: 0xffffff,
      preserveDrawingBuffer: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    this.app.stage.sortableChildren = true;
    this.app.stage.interactiveChildren = false;

    document.body.appendChild(this.app.view);
    this.setMouseInteractions();
  }

  setMouseInteractions() {
    // document.body.addEventListener("contextmenu", (evt) => evt.preventDefault(), false);
    this.app.view.addEventListener("mousemove", (evt) => this.onMouseMoveHandler(evt.pageX, evt.pageY), false);
    this.app.view.addEventListener("click", (evt) => this.onMouseClickHandler(evt.pageX, evt.pageY), false);
  }

  getViewImageDataURL() {
    return this.app.view.toDataURL("image/png");
  }
}
