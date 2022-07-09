import { ROOM_TILE_N } from "~/constants";
import { IObject } from "~/types";
import GameInstance from "~/game/GameInstance";
import Item from "~/game/item/Item";
import { itemToLocal, tileToLocal } from "~/game/room/pos";
import RoomItem from "./RoomItem";

export default class MovingItemManager {
  private item: Item | null;
  isMoving: boolean;

  constructor() {
    this.item = null;
    this.isMoving = false;
  }

  pick(item: RoomItem) {
    const { room } = GameInstance.get();

    this.item = item;
    const [tileX, tileY] = item.getTile();
    const local = tileToLocal(tileX, tileY);
    room.tileManager.updateSelectedTile(local.x, local.y);
    room.tileManager.showSelectedTile();
  }

  pickFromInventory(object: IObject) {
    const { engine, room } = GameInstance.get();

    const uuid = room.roomItemManager.randomUUID();
    this.item = new Item(uuid, object);
    const _globalX = engine.app.renderer.plugins.interaction.mouse.global.x;
    const _globalY = engine.app.renderer.plugins.interaction.mouse.global.y;
    const world = engine.viewport.toWorld(_globalX, _globalY);
    const tile = room.globalToTile(world.x, world.y);
    {
      const [sizeX, sizeY] = this.item.getSize();
      const local = itemToLocal(tile.x, tile.y, sizeX, sizeY, this.item.container.height);
      this.item.updateContainerPlacement(local.x, local.y);
    }
    {
      const local = tileToLocal(tile.x, tile.y);
      room.tileManager.updateSelectedTile(local.x, local.y);
      room.tileManager.showSelectedTile();
    }
    this.move();
  }

  drop() {
    if (!this.item) return;
    const { room } = GameInstance.get();

    this.item = null;
    room.tileManager.hideSelectedTile();
  }

  move() {
    if (!this.item) return;
    this.item.container.alpha = 0.6;
    this.isMoving = true;
  }

  stop() {
    if (!this.item) return;

    this.item.container.alpha = 1.0;
    this.isMoving = false;
    this.drop();
  }

  getItem() {
    return this.item;
  }

  checkCollision(tile: { x: number; y: number }, movingItem: { uuid: string; sizeX: number; sizeY: number }): { x: number; y: number }[] {
    const { room } = GameInstance.get();

    const collisionTiles: { x: number; y: number }[] = [];
    for (let x = tile.x; x <= tile.x + movingItem.sizeX - 1; x++) {
      for (let y = tile.y; y <= tile.y + movingItem.sizeY - 1; y++) {
        const uuid = room.tileManager.getUUIDFromTilemap(x, y);
        if (uuid && uuid !== movingItem.uuid) {
          const item = room.roomItemManager.getItems()[uuid];
          const [tileX, tileY] = item.getTile();
          const [sizeX, sizeY] = item.getSize();
          for (let x = tileX; x <= tileX + sizeX - 1; x++) {
            for (let y = tileY; y <= tileY + sizeY - 1; y++) {
              collisionTiles.push({ x, y });
            }
          }
        }
      }
    }
    return collisionTiles;
  }

  placeItem(tileX: number, tileY: number) {
    if (!this.item) return;
    const [sizeX, sizeY] = this.item.getSize();
    if (sizeX + tileX > ROOM_TILE_N) return;
    if (sizeY + tileY > ROOM_TILE_N) return;
    if (this.checkCollision({ x: tileX, y: tileY }, { uuid: this.item.getUUID(), sizeX, sizeY }).length > 0) return;

    const { room } = GameInstance.get();
    if (this.item instanceof RoomItem) {
      room.roomItemManager.removeItemFromTilemap(this.item.getUUID());
      room.roomItemManager.addItemToTilemap(tileX, tileY, this.item);
      this.item.updatePlacement(tileX, tileY);
    } else {
      room.roomItemManager.addItem(tileX, tileY, this.item.getObject());
      room.landItemContainer.removeChild(this.item.container);
    }
    this.stop();
  }
}
