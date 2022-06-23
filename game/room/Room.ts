import { Container, Sprite } from "pixi.js";
import { Layer } from "@pixi/layers";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH, LAND_H, LAND_OFFSET_Y, LAND_W, TILE_H, TILE_W } from "~/constants";
import GameInstance from "~/game/GameInstance";
import MovingItemManager from "./item/MovingItemManager";
import RoomItemManager from "./item/RoomItemManager";
import TileManager from "./tile/TileManager";
import { Tile } from "./tile/types";
import { isValidTile, itemToLocal, tileToLocal } from "./pos";

export default class Room {
  tileManager: TileManager;
  roomItemManager: RoomItemManager;
  movingItemManager: MovingItemManager;

  worldContainer: Container;
  landContainer: Container;
  landItemContainer: Container;
  landItemLayer: Layer;

  isEdit: boolean;

  constructor() {
    this.roomItemManager = new RoomItemManager();
    this.movingItemManager = new MovingItemManager();
    this.tileManager = new TileManager();

    this.worldContainer = new Container();
    this.worldContainer.zIndex = 1;
    this.landContainer = new Container();
    this.landContainer.zIndex = 2;
    this.landItemContainer = new Container();
    this.landItemContainer.zIndex = 3;
    this.landItemLayer = new Layer();
    this.landItemLayer.zIndex = 4;
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
    engine.viewport.addChild(this.worldContainer);
    engine.viewport.addChild(this.landContainer);
    engine.viewport.addChild(this.landItemContainer);
    engine.viewport.addChild(this.landItemLayer);
  }

  enterRoom() {
    const sprite = Sprite.from("land.png"); // todo: use loader
    this.landContainer.addChild(sprite);

    this.tileManager.setGrid();
    this.tileManager.setSelectedTile();
    this.tileManager.setCollisionTiles();
  }

  leaveRoom() {
    const { room } = GameInstance.get();

    this.landContainer.removeChildren();
    room.roomItemManager.reset();
    room.tileManager.reset();
  }

  view() {
    const { room } = GameInstance.get();

    this.isEdit = false;
    room.landItemContainer.children.forEach((child) => {
      child.buttonMode = false;
    });
    this.tileManager.hideGrid();
    this.tileManager.hideSelectedTile();
    this.tileManager.hideCollisionTiles();
  }

  edit() {
    const { room } = GameInstance.get();

    this.isEdit = true;
    room.landItemContainer.children.forEach((child) => {
      child.buttonMode = true;
    });
    this.tileManager.showGrid();
    this.tileManager.showSelectedTile();
    this.tileManager.showCollisionTiles();
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
      const collision = this.movingItemManager.checkCollision(movingItem.getUUID(), tile.x, tile.y, sizeX, sizeY);
      this.tileManager.updateCollisionTiles(collision);
    }
    {
      const local = tileToLocal(tile.x, tile.y);
      if (isValidTile(tile.x, tile.y)) {
        this.tileManager.updateSelectedTile(local.x, local.y);
        this.tileManager.showSelectedTile();
      } else {
        this.tileManager.hideSelectedTile();
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

  globalToLandTile(globalX: number, globalY: number): Tile | null {
    const tile = this.globalToTile(globalX, globalY);
    if (isValidTile(tile.x, tile.y)) {
      return { x: tile.x, y: tile.y };
    }
    return null;
  }

  globalToTile(globalX: number, globalY: number): Tile {
    const offsetX = this.landContainer.x + (LAND_W / 2 - TILE_W / 2);
    const offsetY = this.landContainer.y + LAND_OFFSET_Y;

    const xminusy = (globalX - TILE_W / 2 - offsetX) / (TILE_W / 2);
    const xplusy = (globalY - offsetY) / (TILE_H / 2);

    const tileX = Math.floor((xminusy + xplusy) / 2);
    const tileY = Math.floor((xplusy - xminusy) / 2);

    return { x: tileX, y: tileY };
  }
}
