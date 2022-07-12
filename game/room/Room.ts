import { Container, Sprite } from "pixi.js";
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

  landContainer: Container;
  landItemContainer: Container;
  landItemLayer: Layer;

  isEdit: boolean;

  constructor() {
    this.roomItemManager = new RoomItemManager();
    this.movingItemManager = new MovingItemManager();
    this.wallpaper = new Wallpaper();

    this.landContainer = new Container();
    this.landContainer.zIndex = 1;
    this.landItemContainer = new Container();
    this.landItemContainer.zIndex = 2;
    this.landItemLayer = new Layer();
    this.landItemLayer.zIndex = 3;
    this.landItemLayer.group.enableSort = true;

    this.isEdit = false;
  }

  initialize() {
    const { engine } = GameInstance.get();
    const landOffsetX = GAME_APP_WIDTH / 2 - LAND_W / 2;
    const landOffsetY = GAME_APP_HEIGHT / 2 - LAND_H / 2;
    this.landContainer.x = landOffsetX;
    this.landContainer.y = landOffsetY;
    this.landItemContainer.x = landOffsetX;
    this.landItemContainer.y = landOffsetY;
    const land = Sprite.from("assets/land.png");
    this.landContainer.addChild(land);
    this.landContainer.addChild(this.wallpaper.container);

    engine.viewport.addChild(this.landContainer);
    engine.viewport.addChild(this.landItemContainer);
    engine.viewport.addChild(this.landItemLayer);
  }

  enterRoom() {
    this.landContainer.visible = true;
  }

  leaveRoom() {
    this.roomItemManager.reset();
    this.landContainer.visible = false;
  }

  view() {
    this.isEdit = false;
    this.landItemContainer.children.forEach((child) => {
      child.buttonMode = false;
    });
  }

  edit() {
    this.isEdit = true;
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
    if (!tile) return;

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
}
