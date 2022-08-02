import GameInstance from "~/game/GameInstance";
import Item from "~/game/item/Item";
import { isItemInLand, itemToLocal } from "~/game/room/helper";
import { IObject } from "~/types";
import RoomItem from "./RoomItem";

export default class MovingItemManager {
  private item: Item | null;
  isMoving: boolean;

  constructor() {
    this.item = null;
    this.isMoving = false;
  }

  pick(item: RoomItem) {
    this.item = item;
    this.item.getTiles().showSelectTile();
  }

  pickFromInventory(object: IObject) {
    const { engine, room } = GameInstance.get();

    const uuid = room.roomItemManager.randomUUID();
    this.item = new Item(uuid, object);
    const _globalX = engine.app.renderer.plugins.interaction.mouse.global.x;
    const _globalY = engine.app.renderer.plugins.interaction.mouse.global.y;
    const world = engine.viewport.toWorld(_globalX, _globalY);
    const tile = room.globalToTile(world.x, world.y);
    const [sizeX, sizeY] = this.item.getSize();
    const local = itemToLocal(tile.x, tile.y, sizeX, sizeY, this.item.container.height);
    this.item.updateContainerPlacement(local.x, local.y);
    this.move();
  }

  drop() {
    if (!this.item) return;
    this.item.getTiles().hideTile();
    this.item = null;
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

  checkCollision(tile: { x: number; y: number }, movingItem: { uuid: string; sizeX: number; sizeY: number }) {
    const { room } = GameInstance.get();

    for (let x = tile.x; x <= tile.x + movingItem.sizeX - 1; x++) {
      for (let y = tile.y; y <= tile.y + movingItem.sizeY - 1; y++) {
        const uuid = room.roomItemManager.getUUIDFromTilemap(x, y);
        if (uuid && uuid !== movingItem.uuid) {
          return true;
        }
      }
    }
    return false;
  }

  placeItem(tileX: number, tileY: number) {
    if (!this.item) return;
    const [sizeX, sizeY] = this.item.getSize();
    if (!isItemInLand(tileX, tileY, sizeX, sizeY)) return;
    if (this.checkCollision({ x: tileX, y: tileY }, { uuid: this.item.getUUID(), sizeX, sizeY })) return;

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
