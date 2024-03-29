import { Container, SCALE_MODES, Sprite, Texture } from "pixi.js";
import { Layer } from "@pixi/layers";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH, LAND_H, LAND_OFFSET_Y, LAND_W, TILE_H, TILE_W } from "~/constants";
import GameInstance from "~/game/GameInstance";
import MovingItemManager from "./item/MovingItemManager";
import RoomItemManager from "./item/RoomItemManager";
import Wallpaper from "./wallpaper/Wallpaper";
import { isItemInLand, isValidTile, itemToLocal } from "./helper";

export default class Room {
  roomItemManager: RoomItemManager;
  movingItemManager: MovingItemManager;
  wallpaper: Wallpaper;

  container: Container;
  landContainer: Container;
  landItemContainer: Container;
  landItemLayer: Layer;
  land: Sprite;

  isEdit: boolean;

  constructor() {
    this.roomItemManager = new RoomItemManager();
    this.movingItemManager = new MovingItemManager();
    this.wallpaper = new Wallpaper();

    this.container = new Container();
    this.container.visible = false;
    this.landContainer = new Container();
    this.landContainer.zIndex = 1;
    this.landItemContainer = new Container();
    this.landItemContainer.zIndex = 2;
    this.landItemLayer = new Layer();
    this.landItemLayer.zIndex = 3;
    this.landItemLayer.group.enableSort = true;
    this.land = new Sprite();

    this.isEdit = false;
  }

  async initialize() {
    return Texture.fromURL("/assets/baseplate.png").then((texture) => {
      const { engine, room, uiManager } = GameInstance.get();

      const landOffsetX = GAME_APP_WIDTH / 2 - LAND_W / 2;
      const landOffsetY = GAME_APP_HEIGHT / 2 - LAND_H / 2;
      this.landContainer.x = landOffsetX;
      this.landContainer.y = landOffsetY;
      this.landItemContainer.x = landOffsetX;
      this.landItemContainer.y = landOffsetY;

      this.land = Sprite.from(texture);
      this.land.texture.baseTexture.scaleMode = engine.scaleMode;
      this.land.on("mousedown", (e) => {
        if (!this.isEdit) return;
        if (!!room.movingItemManager.getItem()) return;
        const origin = e.data.originalEvent;
        uiManager.onOpenWallpaperMenu(origin.x, origin.y);
      });
      this.landContainer.addChild(this.land);
      this.landContainer.addChild(this.wallpaper.container);

      this.container.addChild(this.landContainer);
      this.container.addChild(this.landItemContainer);
      this.container.addChild(this.landItemLayer);
      engine.viewport.addChild(this.container);
      engine.viewport.on("zoomed", () => engine.updateAfterZoom());
    });
  }

  enterRoom() {
    this.container.visible = true;
  }

  leaveRoom() {
    this.roomItemManager.reset();
    this.container.visible = false;
  }

  view() {
    const { engine } = GameInstance.get();

    engine.grids.visible = false;
    this.isEdit = false;
    this.land.buttonMode = false;
    this.land.interactive = false;
    this.landItemContainer.children.forEach((child) => {
      child.buttonMode = false;
    });
  }

  edit() {
    const { engine } = GameInstance.get();

    engine.grids.visible = true;
    this.isEdit = true;
    this.land.buttonMode = true;
    this.land.interactive = true;
    this.landItemContainer.children.forEach((child) => {
      child.buttonMode = true;
    });
  }

  handleMouseMovement(globalX: number, globalY: number) {
    const movingItem = this.movingItemManager.getItem();
    if (!movingItem) return;
    if (!this.movingItemManager.isMoving) return;

    const tile = this.globalToTile(globalX, globalY);
    const [sizeX, sizeY] = movingItem.getSize();
    {
      const local = itemToLocal(tile.x, tile.y, sizeX, sizeY, movingItem.container.height);
      movingItem.updateContainerPlacement(local.x, local.y);
    }
    {
      const isCollision = this.movingItemManager.checkCollision({ x: tile.x, y: tile.y }, { uuid: movingItem.getUUID(), sizeX, sizeY });
      if (isCollision || !isItemInLand(tile.x, tile.y, sizeX, sizeY)) {
        movingItem.getTiles().showCollisionTile();
      } else {
        movingItem.getTiles().showPlaceableTile();
      }
    }
  }

  handleMouseClick(globalX: number, globalY: number) {
    const movingItem = this.movingItemManager.getItem();
    if (!movingItem) return;
    if (!this.movingItemManager.isMoving) return;
    const tile = this.globalToLandTile(globalX, globalY);
    if (!tile) {
      this.movingItemManager.esc();
      return;
    }

    this.movingItemManager.placeItem(tile.x, tile.y);
  }

  globalToLandTile(globalX: number, globalY: number): { x: number; y: number } | null {
    const tile = this.globalToTile(globalX, globalY);
    if (isValidTile(tile.x, tile.y)) {
      return { x: tile.x, y: tile.y };
    }
    return null;
  }

  globalToTile(globalX: number, globalY: number): { x: number; y: number } {
    const offsetX = this.landContainer.x + (LAND_W / 2 - TILE_W / 2);
    const offsetY = this.landContainer.y + LAND_OFFSET_Y;

    const xminusy = (globalX - TILE_W / 2 - offsetX) / (TILE_W / 2);
    const xplusy = (globalY - offsetY) / (TILE_H / 2);

    const tileX = Math.floor((xminusy + xplusy) / 2);
    const tileY = Math.floor((xplusy - xminusy) / 2);

    return { x: tileX, y: tileY };
  }

  updateScaleMode() {
    const { engine } = GameInstance.get();

    if (engine.viewport.scaled > 2) {
      if (engine.scaleMode === SCALE_MODES.NEAREST) return;
      engine.scaleMode = SCALE_MODES.NEAREST;
      this._updateScaleMode(SCALE_MODES.NEAREST);
    } else {
      if (engine.scaleMode === SCALE_MODES.LINEAR) return;
      engine.scaleMode = SCALE_MODES.LINEAR;
      this._updateScaleMode(SCALE_MODES.LINEAR);
    }
  }

  private _updateScaleMode(scaleMode: SCALE_MODES) {
    const { room } = GameInstance.get();

    this.land.texture.baseTexture.scaleMode = scaleMode;
    this.land.texture.baseTexture.update();

    room.wallpaper.sprite.texture.baseTexture.scaleMode = scaleMode;
    room.wallpaper.sprite.texture.baseTexture.update();

    const items = room.roomItemManager.getItems();
    Object.values(items).forEach((item) => {
      item.sprites.forEach((sprite) => {
        sprite.texture.baseTexture.scaleMode = scaleMode;
        sprite.texture.baseTexture.update();
      });
    });
  }
}
