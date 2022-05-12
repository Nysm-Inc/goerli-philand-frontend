import { Application } from "pixi.js";

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
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: false,
      transparent: false,
      resolution: 1,
      preserveDrawingBuffer: true,
    });

    this.app.renderer.resize(window.innerWidth, innerHeight);
    document.body.appendChild(this.app.view);

    this.setMouseInteractions();
  }

  setMouseInteractions() {
    this.app.view.addEventListener(
      "mousemove",
      (evt) => {
        this.onMouseMoveHandler(evt.x, evt.y);
      },
      false
    );
    this.app.view.addEventListener(
      "click",
      (evt) => {
        this.onMouseClickHandler(evt.x, evt.y);
      },
      false
    );
  }

  getViewImageDataURL() {
    return this.app.view.toDataURL("image/png");
  }
}
