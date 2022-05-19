import { ROOM_TILE_N } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { Tile } from "~/game/room/types";
import RoomItem from "./RoomItem";

export default class MovingItemManager {
  private item: RoomItem | null;
  moving: boolean;

  constructor() {
    this.item = null;
    this.moving = false;
  }

  pick(item: RoomItem) {
    this.item = item;
  }

  drop() {
    if (!this.item) return;
    this.item = null;
  }

  move() {
    if (!this.item) return;
    this.item.startMovement();
    this.moving = true;
  }

  stop() {
    if (!this.item) return;
    this.item.stopMovement();
    this.moving = false;
    this.item = null;
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

  placeItem(uuid: string, tileX: number, tileY: number) {
    const { room } = GameInstance.get();

    if (!this.item) return;
    const [sizeX, sizeY] = this.item.getSize();
    if (sizeX + tileX > ROOM_TILE_N) return;
    if (sizeY + tileY > ROOM_TILE_N) return;
    if (this.checkCollision(uuid, tileX, tileY, sizeX, sizeY).length > 0) return;

    room.roomItemManager.removeItemFromTilemap(this.item.getUUID());
    room.roomItemManager.addItemToTilemap(tileX, tileY, this.item);
    this.item.updatePlacement(tileX, tileY);
    this.stop();
  }
}
