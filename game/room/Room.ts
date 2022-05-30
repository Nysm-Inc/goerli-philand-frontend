import { Container, Sprite } from "pixi.js";
import { Layer } from "@pixi/layers";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH, LAND_H, LAND_OFFSET_Y, LAND_W, TILE_H, TILE_W } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { Tile } from "~/game/types";
import MovingItemManager from "./item/MovingItemManager";
import RoomItemManager from "./item/RoomItemManager";
import { isValidTile, itemToLocal, tileToLocal } from "./pos";
import TileManager from "./tile/TileManager";

export default class Room {
  tileManager: TileManager;
  roomItemManager: RoomItemManager;
  movingItemManager: MovingItemManager;
  container: Container;
  containerLayer: Layer;

  constructor() {
    this.container = new Container();
    this.container.zIndex = 1;
    this.containerLayer = new Layer();
    this.containerLayer.zIndex = 2;
    this.containerLayer.group.enableSort = true;

    this.roomItemManager = new RoomItemManager();
    this.movingItemManager = new MovingItemManager();
    this.tileManager = new TileManager();
  }

  enterRoom() {
    const { engine } = GameInstance.get();

    const sprite = Sprite.from("land.png");
    const landOffsetX = GAME_APP_WIDTH / 2 - LAND_W / 2;
    const landOffsetY = GAME_APP_HEIGHT / 2 - LAND_H / 2;
    this.container.x = landOffsetX;
    this.container.y = landOffsetY;
    this.containerLayer.x = landOffsetX;
    this.containerLayer.y = landOffsetY;
    this.container.addChild(sprite);
    engine.app.stage.addChild(this.container);
    engine.app.stage.addChild(this.containerLayer);

    this.tileManager.setGrid();
    this.tileManager.setSelectedTile();
    this.tileManager.setCollisionTiles();
  }

  leaveRoom() {
    const { engine } = GameInstance.get();
    engine.app.stage.removeChildren();
  }

  view() {
    this.tileManager.hideGrid();
    this.tileManager.hideSelectedTile();
    this.tileManager.hideCollisionTiles();
  }

  edit() {
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
    const tile = this.globalToLandTile(globalX, globalY);
    if (!tile) return;
    const movingItem = this.movingItemManager.getItem();
    if (!movingItem) return;
    if (!this.movingItemManager.isMoving) return;

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
    const offsetX = this.container.x + (LAND_W / 2 - TILE_W / 2);
    const offsetY = this.container.y + LAND_OFFSET_Y;

    const xminusy = (globalX - TILE_W / 2 - offsetX) / (TILE_W / 2);
    const xplusy = (globalY - offsetY) / (TILE_H / 2);

    const tileX = Math.floor((xminusy + xplusy) / 2);
    const tileY = Math.floor((xplusy - xminusy) / 2);

    return { x: tileX, y: tileY };
  }
}
