import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH, ROOM_TILE_N } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { isValidTile, tileToLocal } from "~/game/room/pos";
import { Tile } from "./types";
import { newTile } from "./Tile";

const emptyTilemap: string[][] = [...Array(ROOM_TILE_N)].map(() => Array(ROOM_TILE_N).fill(""));

export default class TileManager {
  private tileTextures: {
    grid: Texture;
    selected: Texture;
    collision: Texture;
  };
  private selectedTile: Container;
  private collisionTiles: Container;
  private tileMap: string[][];
  private worldGrid: TilingSprite;
  private landGrid: Container;

  constructor() {
    this.tileTextures = {
      grid: newTile("grid"),
      selected: newTile("select"),
      collision: newTile("collision"),
    };

    this.selectedTile = new Container();
    this.selectedTile.addChild(new Sprite(this.tileTextures.selected));
    this.tileMap = emptyTilemap;
    this.worldGrid = new TilingSprite(this.tileTextures.grid, GAME_APP_WIDTH, GAME_APP_HEIGHT);
    this.landGrid = new Container();
    this.collisionTiles = new Container();
    for (let i = 0; i < ROOM_TILE_N; i++) {
      for (let j = 0; j < ROOM_TILE_N; j++) {
        const sprite = new Sprite(this.tileTextures.grid);
        const local = tileToLocal(i, j);
        sprite.x = local.x;
        sprite.y = local.y;
        this.landGrid.addChild(sprite);
      }
    }
  }

  getUUIDFromTilemap(x: number, y: number) {
    if (isValidTile(x, y)) {
      return this.tileMap[x][y];
    } else {
      return "";
    }
  }

  getTilemap() {
    return this.tileMap;
  }

  setTilemap(x: number, y: number, uuid: string) {
    if (isValidTile(x, y)) {
      this.tileMap[x][y] = uuid;
    }
  }

  setCollisionTiles() {
    const { room } = GameInstance.get();

    this.collisionTiles.visible = false;
    room.landContainer.addChild(this.collisionTiles);
  }

  showCollisionTiles() {
    this.collisionTiles.visible = true;
  }

  hideCollisionTiles() {
    this.collisionTiles.visible = false;
  }

  updateCollisionTiles(tiles: Tile[]) {
    this.collisionTiles.removeChildren();

    const tmp = new Container();
    tiles.forEach((tile) => {
      const sprite = new Sprite(this.tileTextures.collision);
      const local = tileToLocal(tile.x, tile.y);
      sprite.x = local.x;
      sprite.y = local.y;
      tmp.addChild(sprite);
    });
    this.collisionTiles.addChild(tmp);
  }

  setSelectedTile() {
    const { room } = GameInstance.get();

    this.selectedTile.visible = false;
    room.landContainer.addChild(this.selectedTile);
  }

  updateSelectedTile(localX: number, localY: number) {
    this.selectedTile.x = localX;
    this.selectedTile.y = localY;
  }

  showSelectedTile() {
    this.selectedTile.visible = true;
  }

  hideSelectedTile() {
    this.selectedTile.visible = false;
  }

  setGrid() {
    const { room } = GameInstance.get();

    this.landGrid.visible = false;
    this.worldGrid.visible = false;

    room.landContainer.addChild(this.landGrid);
    room.worldContainer.addChild(this.worldGrid);
  }

  showGrid() {
    this.worldGrid.visible = true;
    this.landGrid.visible = true;
  }

  hideGrid() {
    this.worldGrid.visible = false;
    this.landGrid.visible = false;
  }

  reset() {
    const { room } = GameInstance.get();

    this.tileMap = emptyTilemap;
    this.updateSelectedTile(0, 0);
    room.landContainer.removeChildren();
  }
}
