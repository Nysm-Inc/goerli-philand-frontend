// todo
// refactor: iso grid
// add selected tile
// add collision tile

import { Container, Sprite, TilingSprite } from "pixi.js";
import { GAME_APP_HEIGHT, GAME_APP_WIDTH, ROOM_TILE_N } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { tileToLocal } from "~/game/room/pos";
import { newTile } from "./Tile";

export default class TileManager {
  private baseGrid: TilingSprite;
  private landGrid: Container;

  constructor() {
    const tile = newTile();
    this.baseGrid = new TilingSprite(tile, GAME_APP_WIDTH, GAME_APP_HEIGHT);
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

  setIsoGrid() {
    const { engine, room } = GameInstance.get();

    this.landGrid.visible = false;
    this.baseGrid.visible = false;
    this.baseGrid.zIndex = 0;

    room.container.addChild(this.landGrid);
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
}
