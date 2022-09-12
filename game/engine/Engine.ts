import { Application, Container, Resource, SCALE_MODES, Sprite, Texture, TilingSprite } from "pixi.js";
import { Stage as LayerStage } from "@pixi/layers";
import { Viewport } from "pixi-viewport";
import cloneDeep from "lodash.clonedeep";
import { GAME_APP_WIDTH, GAME_APP_HEIGHT, LAND_OGP_W, LAND_OGP_H, LAND_OGP_PADDING_B, LAND_H } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { ColorMode, zIndices } from "~/ui/styles";
import "./pixelPerfectInteraction";

export default class Engine {
  app: Application;
  viewport: Viewport;
  cloudContainer: Container;
  clouds: { [mode in ColorMode]: Container };
  cloudSprites: { [mode in ColorMode]: { lefttop: Sprite; righttop: Sprite; leftbottom: Sprite; rightbottom: Sprite } };
  grids: Container;
  gridSprites: { [mode in ColorMode]: TilingSprite };
  ogpLayout: { [mode in ColorMode]: Texture };
  assetTextures: { [format: string]: Texture<Resource> };
  colorMode: ColorMode;
  scaleMode: SCALE_MODES;
  isMobile: boolean;
  onMouseMoveHandler: (mouseX: number, mouseY: number) => void;
  onMouseClickHandler: (mouseX: number, mouseY: number) => void;

  constructor(onMouseMove: (mouseX: number, mouseY: number) => void, onMouseClick: (mouseX: number, mouseY: number) => void) {
    this.onMouseMoveHandler = onMouseMove;
    this.onMouseClickHandler = onMouseClick;
    this.colorMode = "light";
    this.scaleMode = SCALE_MODES.LINEAR;
    this.ogpLayout = {
      light: Sprite.from("/assets/ogp_layout_light.png").texture,
      dark: Sprite.from("/assets/ogp_layout_dark.png").texture,
    };
    this.assetTextures = {};

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
    this.app.loader.concurrency = 100;
    this.app.renderer.on("resize", () => {
      this.viewport.screenWidth = window.innerWidth;
      this.viewport.screenHeight = window.innerHeight;
      this.initializeCloudsPosition();
    });
    document.body.appendChild(this.app.view);
    this.blurCanvas();

    this.viewport = new Viewport({
      worldWidth: GAME_APP_WIDTH,
      worldHeight: GAME_APP_HEIGHT,
      interaction: this.app.renderer.plugins.interaction,
      passiveWheel: false,
      stopPropagation: true,
    });
    this.isMobile = window.matchMedia("(any-pointer:coarse)").matches;
    this.viewport
      .moveCenter(GAME_APP_WIDTH / 2, GAME_APP_HEIGHT / 2)
      .setZoom(this.isMobile ? 0.4 : 1, true)
      .clampZoom({ minScale: 0.1, maxScale: 16 })
      .drag({ clampWheel: false, wheel: true, pressDrag: this.isMobile })
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

    this.cloudContainer = new Container();
    this.clouds = { light: new Container(), dark: new Container() };
    this.clouds.light.visible = false;
    this.clouds.dark.visible = false;
    this.cloudSprites = {
      light: {
        lefttop: Sprite.from("/assets/clouds/cloud_lefttop_light.png"),
        righttop: Sprite.from("/assets/clouds/cloud_righttop_light.png"),
        leftbottom: Sprite.from("/assets/clouds/cloud_leftbottom_light.png"),
        rightbottom: Sprite.from("/assets/clouds/cloud_rightbottom_light.png"),
      },
      dark: {
        lefttop: Sprite.from("/assets/clouds/cloud_lefttop_dark.png"),
        righttop: Sprite.from("/assets/clouds/cloud_righttop_dark.png"),
        leftbottom: Sprite.from("/assets/clouds/cloud_leftbottom_dark.png"),
        rightbottom: Sprite.from("/assets/clouds/cloud_rightbottom_dark.png"),
      },
    };
    this.initializeCloudsPosition();
    this.clouds.light.addChild(this.cloudSprites.light.lefttop);
    this.clouds.light.addChild(this.cloudSprites.light.righttop);
    this.clouds.light.addChild(this.cloudSprites.light.leftbottom);
    this.clouds.light.addChild(this.cloudSprites.light.rightbottom);
    this.cloudContainer.addChild(this.clouds.light);
    this.clouds.dark.addChild(this.cloudSprites.dark.lefttop);
    this.clouds.dark.addChild(this.cloudSprites.dark.righttop);
    this.clouds.dark.addChild(this.cloudSprites.dark.leftbottom);
    this.clouds.dark.addChild(this.cloudSprites.dark.rightbottom);
    this.cloudContainer.addChild(this.clouds.dark);
    this.app.stage.addChild(this.cloudContainer);

    this.grids = new Container();
    this.grids.zIndex = -1;
    this.grids.visible = false;
    this.gridSprites = {
      light: new TilingSprite(Texture.from("/assets/grid-pattern-light.png"), GAME_APP_WIDTH, GAME_APP_HEIGHT),
      dark: new TilingSprite(Texture.from("/assets/grid-pattern-dark.png"), GAME_APP_WIDTH, GAME_APP_HEIGHT),
    };
    this.gridSprites.light.visible = false;
    this.gridSprites.dark.visible = false;
    this.grids.addChild(this.gridSprites.light);
    this.grids.addChild(this.gridSprites.dark);
    this.app.stage.addChild(this.grids);
  }

  async loadAssetTextures() {
    return new Promise((resolve, reject) => {
      this.app.loader
        .add("spritesheet0", "/assets/spritesheet_0.json")
        .add("spritesheet1", "/assets/spritesheet_1.json")
        .load((_, resources) => {
          this.assetTextures = { ...resources["spritesheet0"].textures, ...resources["spritesheet1"].textures };
        });
      this.app.loader.onComplete.add(() => resolve("loaded"));
      this.app.loader.onError.add(() => reject("failed to load assets"));
    });
  }

  changeColorMode(colorMode: ColorMode) {
    this.colorMode = colorMode;

    if (colorMode === "light") {
      this.app.renderer.backgroundColor = 0xf5f2eb;

      this.clouds.light.visible = true;
      this.clouds.dark.visible = false;

      this.gridSprites.light.visible = true;
      this.gridSprites.dark.visible = false;
    } else {
      this.app.renderer.backgroundColor = 0x0d0d0d;

      this.clouds.dark.visible = true;
      this.clouds.light.visible = false;

      this.gridSprites.dark.visible = true;
      this.gridSprites.light.visible = false;
    }
  }

  exportImage() {
    const { room } = GameInstance.get();
    const container = new Container();

    // background
    container.addChild(Sprite.from(this.ogpLayout[this.colorMode]));

    // land
    const roomContainer = cloneDeep(room.container);
    roomContainer.children.forEach((child) => {
      child.x = 0;
      child.y = 0;
    });
    container.addChild(roomContainer);

    // margin
    roomContainer.x = (LAND_OGP_W - roomContainer.width) / 2;
    roomContainer.y = LAND_OGP_H - LAND_H - LAND_OGP_PADDING_B;
    if (container.height > LAND_OGP_H) roomContainer.y += LAND_OGP_PADDING_B / 2;

    return this.app.renderer.plugins.extract.base64(container);
  }

  center() {
    this.viewport.moveCenter(GAME_APP_WIDTH / 2, GAME_APP_HEIGHT / 2).setZoom(1, true);
    this.updateAfterZoom();
  }

  zoom(scale: number) {
    this.viewport.setZoom(scale, true);
    this.updateAfterZoom();
  }

  updateAfterZoom() {
    const { uiManager, room } = GameInstance.get();

    this.updateClouds();
    room.updateScaleMode();
    uiManager.onChangeScaled(this.viewport.scaled);
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

  showClouds() {
    this.cloudContainer.visible = true;
  }

  hideClouds() {
    this.cloudContainer.visible = false;
  }

  updateClouds() {
    if (this.isMobile) return;

    if (this.viewport.scaled > 2) {
      this.hideClouds();
    } else {
      this.showClouds();
    }
  }

  initializeCloudsPosition() {
    this.cloudSprites.light.lefttop.x = 0;
    this.cloudSprites.light.lefttop.y = 0;
    this.cloudSprites.light.righttop.x = window.innerWidth - 466;
    this.cloudSprites.light.righttop.y = 0;
    this.cloudSprites.light.leftbottom.x = 0;
    this.cloudSprites.light.leftbottom.y = window.innerHeight - 312;
    this.cloudSprites.light.rightbottom.x = window.innerWidth - 466;
    this.cloudSprites.light.rightbottom.y = window.innerHeight - 312;

    this.cloudSprites.dark.lefttop.x = 0;
    this.cloudSprites.dark.lefttop.y = 0;
    this.cloudSprites.dark.righttop.x = window.innerWidth - 466;
    this.cloudSprites.dark.righttop.y = 0;
    this.cloudSprites.dark.leftbottom.x = 0;
    this.cloudSprites.dark.leftbottom.y = window.innerHeight - 312;
    this.cloudSprites.dark.rightbottom.x = window.innerWidth - 466;
    this.cloudSprites.dark.rightbottom.y = window.innerHeight - 312;
  }

  focusCanvas() {
    try {
      const canvasEl: HTMLCanvasElement | null = document.getElementsByTagName("canvas")?.[0];
      canvasEl.style.position = "fixed";
      canvasEl.style.zIndex = zIndices["canvas-focus"].toString();
    } catch {}
  }

  blurCanvas() {
    try {
      const canvasEl: HTMLCanvasElement | null = document.getElementsByTagName("canvas")?.[0];
      canvasEl.style.position = "fixed";
      canvasEl.style.zIndex = zIndices["canvas"].toString();
    } catch {}
  }
}
