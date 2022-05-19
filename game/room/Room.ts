import { Container, Sprite, TilingSprite } from "pixi.js";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH, LAND_OFFSET_Y, LAND_W, ROOM_TILE_N, TILE_H, TILE_W } from "~/constants";
import GameInstance from "~/game/GameInstance";
import MovingItemManager from "./item/MovingItemManager";
import RoomItemManager from "./item/RoomItemManager";
import { Tile } from "./types";
import { isPlaceble, isValidTile, tileToLocal } from "./pos";
import { newTile } from "./tile/Tile";

export default class Room {
  private tileMap: string[][];
  private baseGrid: TilingSprite;
  private landGrid: Container;
  roomItemManager: RoomItemManager;
  movingItemManager: MovingItemManager;
  container: Container;

  constructor() {
    this.container = new Container();
    this.container.zIndex = 1;
    this.container.sortableChildren = true;
    this.roomItemManager = new RoomItemManager(this);
    this.movingItemManager = new MovingItemManager(this);
    this.tileMap = [...Array(ROOM_TILE_N)].map(() => Array(ROOM_TILE_N).fill(""));
    const tile = newTile();
    this.baseGrid = new TilingSprite(tile, GAME_APP_WIDTH, GAME_APP_WIDTH);
    this.landGrid = new Container();
    for (let i = 0; i < ROOM_TILE_N; i++) {
      for (let j = 0; j < ROOM_TILE_N; j++) {
        const sprite = new Sprite(tile);
        const local = tileToLocal(i, j);
        sprite.x = local.x;
        sprite.y = local.y;
        this.landGrid.addChild(sprite);
      }
    }
  }

  enterRoom() {
    const { engine } = GameInstance.get();

    const sprite = Sprite.from("land.png");
    this.container.addChild(sprite);
    sprite.texture.baseTexture.on("loaded", () => {
      this.container.x = GAME_APP_WIDTH / 2 - sprite.width / 2;
      this.container.y = GAME_APP_HEIGHT / 2 - sprite.height / 2;
    });
    engine.app.stage.addChild(this.container);
    this.setIsoGrid();
  }

  setIsoGrid() {
    const { engine } = GameInstance.get();

    this.landGrid.visible = false;
    this.baseGrid.visible = false;
    this.baseGrid.zIndex = 0;

    this.container.addChild(this.landGrid);
    engine.app.stage.addChild(this.baseGrid);
  }

  showIsoGrid() {
    const { engine } = GameInstance.get();
    engine.app.stage.interactiveChildren = true;
    this.baseGrid.visible = true;
    this.landGrid.visible = true;
  }

  hideIsoGrid() {
    const { engine } = GameInstance.get();
    engine.app.stage.interactiveChildren = false;
    this.baseGrid.visible = false;
    this.landGrid.visible = false;
  }

  getUUIDFromTilemap(x: number, y: number) {
    return this.tileMap[x][y];
  }

  setTilemap(x: number, y: number, uuid: string) {
    this.tileMap[x][y] = uuid;
  }

  handleMouseMovement(globalX: number, globalY: number) {
    const tile = this.globalToTile(globalX, globalY);
    if (!tile) return;
    if (!this.movingItemManager.moving) return;

    const movingItem = this.movingItemManager.getItem();
    if (movingItem) {
      const [sizeX, sizeY] = movingItem.getSize();
      if (!isPlaceble(tile.x, tile.y, sizeX, sizeY)) return;

      const local = tileToLocal(tile.x + sizeX, tile.y + sizeY);
      const updateLocalX = local.x - (TILE_W / 2) * (sizeX - 1);
      const updateLocalY = local.y - movingItem.container.height;
      movingItem.updateContainerPlacement(updateLocalX, updateLocalY);
    }
  }

  handleMouseClick(globalX: number, globalY: number) {
    const tile = this.globalToTile(globalX, globalY);
    if (!tile) return;
    const movingItem = this.movingItemManager.getItem();
    if (!movingItem) return;

    this.movingItemManager.placeItem(movingItem.getUUID(), tile.x, tile.y);
  }

  globalToTile(globalX: number, globalY: number): Tile | null {
    const tile = this._globalToTile(globalX, globalY);
    if (isValidTile(tile.x, tile.y)) {
      return { x: tile.x, y: tile.y };
    }
    return null;
  }

  private _globalToTile(globalX: number, globalY: number): Tile {
    const offsetX = this.container.x + (LAND_W / 2 - TILE_W / 2);
    const offsetY = this.container.y + LAND_OFFSET_Y;

    const xminusy = (globalX - TILE_W / 2 - offsetX) / (TILE_W / 2);
    const xplusy = (globalY - offsetY) / (TILE_H / 2);

    const tileX = Math.floor((xminusy + xplusy) / 2);
    const tileY = Math.floor((xplusy - xminusy) / 2);

    return { x: tileX, y: tileY };
  }
}
