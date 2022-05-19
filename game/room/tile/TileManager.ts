import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH, ROOM_TILE_N } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { tileToLocal } from "~/game/room/pos";
import { Tile } from "~/game/room/types";
import { newTile } from "./Tile";

const emptyTileMap = [...Array(ROOM_TILE_N)].map(() => Array(ROOM_TILE_N).fill(""));

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
    this.tileMap = emptyTileMap;
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

  setCollisionTiles() {
    const { room } = GameInstance.get();
    room.container.addChild(this.collisionTiles);
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
    room.container.addChild(this.selectedTile);
  }

  showSelectedTile(localX: number, localY: number) {
    this.selectedTile.x = localX;
    this.selectedTile.y = localY;
    this.selectedTile.visible = true;
  }

  hideSelectedTile() {
    this.selectedTile.visible = false;
  }

  setGrid() {
    const { engine, room } = GameInstance.get();

    this.landGrid.visible = false;
    this.worldGrid.visible = false;
    this.worldGrid.zIndex = 0;

    room.container.addChild(this.landGrid);
    engine.app.stage.addChild(this.worldGrid);
  }

  showGrid() {
    const { engine } = GameInstance.get();

    engine.app.stage.interactiveChildren = true;
    this.worldGrid.visible = true;
    this.landGrid.visible = true;
  }

  hideGrid() {
    const { engine } = GameInstance.get();

    engine.app.stage.interactiveChildren = false;
    this.worldGrid.visible = false;
    this.landGrid.visible = false;
  }

  getUUIDFromTilemap(x: number, y: number) {
    return this.tileMap[x][y];
  }

  setTilemap(x: number, y: number, uuid: string) {
    this.tileMap[x][y] = uuid;
  }
}
