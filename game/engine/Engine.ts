import { Application, LoaderResource, Texture } from "pixi.js";
import { Stage as LayerStage } from "@pixi/layers";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { phiObjectMetadataList } from "~/types/object";
import "./pixelPerfectInteraction";

export default class Engine {
  app: Application;
  globalTextures: { [contract: string]: { [tokenId: number]: Texture } };
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
    this.app.stage = new LayerStage();
    this.app.stage.sortableChildren = true;
    this.app.stage.interactiveChildren = false;
    this.globalTextures = { [PHI_OBJECT_CONTRACT_ADDRESS]: {} };

    document.body.appendChild(this.app.view);
    this.setMouseInteractions();
  }

  async loadGlobalTextures() {
    return new Promise((resolve, reject) => {
      for (const [contract, metadataList] of Object.entries(phiObjectMetadataList)) {
        for (const metadata of Object.values(metadataList)) {
          this.app.loader.add(contract + "_" + metadata.tokenId, metadata.image_url, {
            crossOrigin: "*",
            loadType: LoaderResource.LOAD_TYPE.IMAGE,
          });
        }
      }

      this.app.loader.load((_, resources) => {
        for (let resourceId in resources) {
          const res = resources[resourceId];
          if (res?.texture) {
            const contract_tokenId = resourceId.split("_");
            // @ts-ignore
            this.globalTextures[contract_tokenId[0]][contract_tokenId[1]] = res.texture;
          }
        }
      });

      this.app.loader.onError.add(() => reject("failed to load"));
      this.app.loader.onComplete.add(() => resolve("loaded"));
    });
  }

  setMouseInteractions() {
    // document.body.addEventListener("contextmenu", (evt) => evt.preventDefault(), false);
    this.app.view.addEventListener("mousemove", (evt) => this.onMouseMoveHandler(evt.pageX, evt.pageY), false);
    this.app.view.addEventListener("click", (evt) => this.onMouseClickHandler(evt.pageX, evt.pageY), false);
  }

  getViewImageDataURL() {
    return this.app.view.toDataURL("image/png");
  }

  reset() {
    document.body.removeChild(this.app.view);
  }
}
