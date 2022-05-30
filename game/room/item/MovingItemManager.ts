import { ROOM_TILE_N } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { Tile } from "~/game/types";
import { tileToLocal } from "~/game/room/pos";
import RoomItem from "./RoomItem";

export default class MovingItemManager {
  private item: RoomItem | null;
  isMoving: boolean;

  constructor() {
    this.item = null;
    this.isMoving = false;
  }

  pick(item: RoomItem) {
    const { room } = GameInstance.get();

    this.item = item;
    const [tileX, tileY] = this.item.getTile();
    const local = tileToLocal(tileX, tileY);
    room.tileManager.updateSelectedTile(local.x, local.y);
    room.tileManager.showSelectedTile();
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

  checkCollision(uuid: string, tileX: number, tileY: number, sizeX: number, sizeY: number): Tile[] {
    const { room } = GameInstance.get();

    const collisionTiles: Tile[] = [];
    for (let x = tileX; x <= tileX + sizeX - 1; x++) {
      for (let y = tileY; y <= tileY + sizeY - 1; y++) {
        const prevUUID = room.tileManager.getUUIDFromTilemap(x, y);
        if (prevUUID && prevUUID !== uuid) {
          collisionTiles.push({ x, y });
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
    if (this.checkCollision(this.item.getUUID(), tileX, tileY, sizeX, sizeY).length > 0) return;

    const { room } = GameInstance.get();
    room.roomItemManager.removeItemFromTilemap(this.item.getUUID());
    room.roomItemManager.addItemToTilemap(tileX, tileY, this.item);
    this.item.updatePlacement(tileX, tileY);
    this.stop();
  }
}
