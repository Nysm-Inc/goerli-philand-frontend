import { Application } from "pixi.js";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH } from "~/constants";

export default class Engine {
  app: Application;
  onMouseMoveHandler: (mouseX: number, mouseY: number) => void;
  onMouseClickHandler: (mouseX: number, mouseY: number, mouseScreenX: number, mouseScreenY: number) => void;

  constructor(
    onMouseMove: (mouseX: number, mouseY: number) => void,
    onMouseClick: (mouseX: number, mouseY: number, mouseScreenX: number, mouseScreenY: number) => void
  ) {
    this.onMouseMoveHandler = onMouseMove;
    this.onMouseClickHandler = onMouseClick;

    this.app = new Application({
      width: GAME_APP_WIDTH, // window.innerWidth,
      height: GAME_APP_HEIGHT, // window.innerHeight,
      backgroundColor: 0xffffff,
      preserveDrawingBuffer: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    // this.app.stage.scale.set(0.8);
    document.body.appendChild(this.app.view);
    this.setMouseInteractions();
  }

  setMouseInteractions() {
    this.app.view.addEventListener(
      "mousemove",
      (evt) => {
        // this.onMouseMoveHandler(evt.x, evt.y);
        this.onMouseMoveHandler(evt.pageX, evt.pageY);
      },
      false
    );
    this.app.view.addEventListener(
      "click",
      (evt) => {
        // this.onMouseClickHandler(evt.x, evt.y);
        this.onMouseClickHandler(evt.pageX, evt.pageY, evt.x, evt.y);
      },
      false
    );
  }

  getViewImageDataURL() {
    return this.app.view.toDataURL("image/png");
  }
}
