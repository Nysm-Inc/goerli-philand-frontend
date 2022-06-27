import { Application, LoaderResource, Sprite, Texture } from "pixi.js";
import { Stage as LayerStage } from "@pixi/layers";
import { Viewport } from "pixi-viewport";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  GAME_APP_HEIGHT,
  GAME_APP_WIDTH,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
} from "~/constants";
import { ObjectContractAddress } from "~/types";
import { objectMetadataList } from "~/types/object";
import { ColorMode } from "~/ui/styles";
import "./pixelPerfectInteraction";

export default class Engine {
  app: Application;
  viewport: Viewport;
  globalTextures: { [contract in ObjectContractAddress]: { [tokenId: number]: Texture } };
  staticAssets: {
    clouds: Sprite;
    cloudsBlack: Sprite;
  };
  onMouseMoveHandler: (mouseX: number, mouseY: number) => void;
  onMouseClickHandler: (mouseX: number, mouseY: number) => void;

  constructor(onMouseMove: (mouseX: number, mouseY: number) => void, onMouseClick: (mouseX: number, mouseY: number) => void) {
    this.onMouseMoveHandler = onMouseMove;
    this.onMouseClickHandler = onMouseClick;

    this.globalTextures = {
      [PHI_OBJECT_CONTRACT_ADDRESS]: {},
      [FREE_OBJECT_CONTRACT_ADDRESS]: {},
      [PREMIUM_OBJECT_CONTRACT_ADDRESS]: {},
    };

    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xf5f2eb,
      preserveDrawingBuffer: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    this.app.stage = new LayerStage();
    this.app.stage.sortableChildren = true;
    document.body.appendChild(this.app.view);

    this.viewport = new Viewport({
      worldWidth: GAME_APP_WIDTH,
      worldHeight: GAME_APP_HEIGHT,
      interaction: this.app.renderer.plugins.interaction,
      passiveWheel: false,
      stopPropagation: true,
    });
    const isMobile = window.matchMedia("(any-pointer:coarse)").matches;
    this.viewport
      .moveCenter(GAME_APP_WIDTH / 2, GAME_APP_HEIGHT / 2)
      .setZoom(0.6, true)
      .clampZoom({
        minWidth: GAME_APP_WIDTH / 2,
        maxWidth: GAME_APP_WIDTH * 2,
        minHeight: GAME_APP_HEIGHT / 2,
        maxHeight: GAME_APP_HEIGHT * 2,
      })
      .drag({
        clampWheel: false,
        wheel: true,
        pressDrag: isMobile, // todo: diff mobile
      })
      .wheel({ smooth: 3, trackpadPinch: true, wheelZoom: false })
      .pinch()
      .decelerate()
      .on("clicked", (evt) => {
        this.onMouseClickHandler(evt.world.x, evt.world.y);
      })
      .on("mousemove", (evt) => {
        const world = this.viewport.toWorld(evt.data.global);
        this.onMouseMoveHandler(world.x, world.y);
      });
    this.app.stage.addChild(this.viewport);

    this.staticAssets = {
      clouds: Sprite.from("clouds.png"),
      cloudsBlack: Sprite.from("clouds_black.png"),
    };
    this.staticAssets.clouds.width = window.innerWidth;
    this.staticAssets.clouds.height = window.innerHeight;
    this.staticAssets.clouds.visible = false;
    this.app.stage.addChild(this.staticAssets.clouds);
    this.staticAssets.cloudsBlack.width = window.innerWidth;
    this.staticAssets.cloudsBlack.height = window.innerHeight;
    this.staticAssets.cloudsBlack.visible = false;
    this.app.stage.addChild(this.staticAssets.cloudsBlack);
  }

  // todo: cache loaded files
  async loadGlobalTextures() {
    return new Promise((resolve, reject) => {
      for (const [contract, metadataList] of Object.entries(objectMetadataList)) {
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

      this.app.loader.onComplete.add(() => {
        console.log("loaded all assets");
        resolve("loaded");
      });
      this.app.loader.onError.add(() => reject("failed to load"));
    });
  }

  changeColorMode(colorMode: ColorMode) {
    if (colorMode === "light") {
      this.app.renderer.backgroundColor = 0xf5f2eb;
      this.staticAssets.clouds.visible = true;
      this.staticAssets.cloudsBlack.visible = false;
    } else {
      this.app.renderer.backgroundColor = 0x0d0d0d;
      this.staticAssets.clouds.visible = false;
      this.staticAssets.cloudsBlack.visible = true;
    }
  }

  getViewImageDataURL() {
    return this.app.view.toDataURL("image/png");
  }

  reset() {
    document.body.removeChild(this.app.view);
  }
}
