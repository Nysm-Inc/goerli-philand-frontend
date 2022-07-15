import { Application, Container, Graphics, LoaderResource, Sprite, Texture } from "pixi.js";
import { Stage as LayerStage } from "@pixi/layers";
import { Viewport } from "pixi-viewport";
import cloneDeep from "lodash.clonedeep"; // todo
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  GAME_APP_HEIGHT,
  GAME_APP_WIDTH,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { ObjectContractAddress, WallpaperContractAddress } from "~/types";
import { objectMetadataList } from "~/types/object";
import { ColorMode } from "~/ui/styles";
import "./pixelPerfectInteraction";

export default class Engine {
  app: Application;
  viewport: Viewport;
  worldContainer: Container;
  globalTextures: { [contract in ObjectContractAddress | WallpaperContractAddress]: { [tokenId: number]: Texture } };
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
      [WALLPAPER_CONTRACT_ADDRESS]: {},
    };

    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xf5f2eb,
      preserveDrawingBuffer: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      // resizeTo: window, // todo
    });
    this.app.stage = new LayerStage();
    this.app.stage.sortableChildren = true;
    this.app.loader.concurrency = 100; // todo
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
      .setZoom(isMobile ? 0.25 : 0.6, true)
      .clampZoom({ minScale: 0.1, maxScale: 16 })
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
      })
      .on("zoomed", ({ viewport }: { viewport: Viewport }) => {
        this.worldContainer.visible = viewport.scale._x < 2;
      });
    this.app.stage.addChild(this.viewport);

    this.staticAssets = {
      clouds: Sprite.from("assets/clouds.png"),
      cloudsBlack: Sprite.from("assets/clouds_black.png"),
    };
    this.staticAssets.clouds.width = window.innerWidth;
    this.staticAssets.clouds.height = window.innerHeight;
    this.staticAssets.clouds.visible = false;
    this.staticAssets.cloudsBlack.width = window.innerWidth;
    this.staticAssets.cloudsBlack.height = window.innerHeight;
    this.staticAssets.cloudsBlack.visible = false;
    this.worldContainer = new Container();
    this.worldContainer.addChild(this.staticAssets.clouds);
    this.worldContainer.addChild(this.staticAssets.cloudsBlack);
    this.app.stage.addChild(this.worldContainer);
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

      this.app.loader.onComplete.add(() => resolve("loaded"));
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

  exportImage() {
    const [ogpW, ogpH] = [2000, 2000]; // todo
    const container = new Container();
    const background = new Graphics().beginFill(0xf5f2eb).drawRect(0, 0, ogpW, ogpH).endFill();
    container.addChild(background);

    const clouds = Sprite.from("assets/clouds.png");
    clouds.width = ogpW;
    clouds.height = ogpH;
    container.addChild(clouds);

    const viewport = cloneDeep(this.viewport);
    viewport.resize(ogpW, ogpH, ogpW, ogpH);
    viewport.setZoom(1, true);
    viewport.x = -ogpW / 2;
    viewport.y = -ogpH / 2;
    container.addChild(viewport);

    return this.app.renderer.plugins.extract.base64(container);
  }

  reset() {
    document.body.removeChild(this.app.view);
  }
}
