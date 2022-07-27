import { Application, Container, Graphics, LoaderResource, Sprite, Texture, TilingSprite } from "pixi.js";
import { Stage as LayerStage } from "@pixi/layers";
import { Viewport } from "pixi-viewport";
import cloneDeep from "lodash.clonedeep"; // todo
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  GAME_APP_HEIGHT,
  GAME_APP_WIDTH,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
  LAND_OGP_W,
  LAND_OGP_H,
} from "~/constants";
import { ObjectContractAddress, WallpaperContractAddress } from "~/types";
import { objectMetadataList } from "~/types/object";
import { ColorMode } from "~/ui/styles";
import "./pixelPerfectInteraction";

export default class Engine {
  app: Application;
  viewport: Viewport;
  globalTextures: { [contract in ObjectContractAddress | WallpaperContractAddress]: { [tokenId: number]: Texture } };
  grids: Container;
  onMouseMoveHandler: (mouseX: number, mouseY: number) => void;
  onMouseClickHandler: (mouseX: number, mouseY: number) => void;

  constructor(onMouseMove: (mouseX: number, mouseY: number) => void, onMouseClick: (mouseX: number, mouseY: number) => void) {
    this.onMouseMoveHandler = onMouseMove;
    this.onMouseClickHandler = onMouseClick;

    this.globalTextures = {
      [QUEST_OBJECT_CONTRACT_ADDRESS]: {},
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
      resizeTo: window,
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
        // todo
        // viewport.scale._x < 2;
      });
    this.app.stage.addChild(this.viewport);

    this.grids = new Container();
    const tilingSprite = new TilingSprite(Texture.from("assets/grid-pattern.png"), GAME_APP_WIDTH, GAME_APP_HEIGHT);
    tilingSprite.alpha = 0.1;
    this.grids.zIndex = -1;
    this.grids.visible = false;
    this.grids.addChild(tilingSprite);
    this.app.stage.addChild(this.grids);
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
    this.app.renderer.backgroundColor = colorMode === "light" ? 0xf5f2eb : 0x0d0d0d;
  }

  exportImage(colorMode: ColorMode) {
    const [ogpW, ogpH] = [LAND_OGP_W, LAND_OGP_H];
    const container = new Container();
    const background = new Graphics()
      .beginFill(colorMode === "light" ? 0xf5f2eb : 0x0d0d0d)
      .drawRect(0, 0, ogpW, ogpH)
      .endFill();
    container.addChild(background);

    const clouds = Sprite.from(colorMode === "light" ? "assets/clouds.png" : "assets/clouds_black.png");
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

  show() {
    try {
      document.body.appendChild(this.app.view);
    } catch {}
  }

  hide() {
    try {
      document.body.removeChild(this.app.view);
    } catch {}
  }
}
