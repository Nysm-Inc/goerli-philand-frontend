import { ROOM_TILE_N } from "~/constants";
import Room from "~/game/room/Room";
import RoomItem from "./RoomItem";

export default class MovingItemManager {
  private room: Room;
  private item: RoomItem | null;
  moving: boolean;

  constructor(room: Room) {
    this.room = room;
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

  placeItem(uuid: string, tileX: number, tileY: number) {
    if (!this.item) return;
    const [sizeX, sizeY] = this.item.getSize();
    if (sizeX + tileX > ROOM_TILE_N) return;
    if (sizeY + tileY > ROOM_TILE_N) return;
    for (let x = tileX; x <= tileX + sizeX - 1; x++) {
      for (let y = tileY; y <= tileY + sizeY - 1; y++) {
        const prevUUID = this.room.getUUIDFromTilemap(x, y);
        if (prevUUID && prevUUID !== uuid) return;
      }
    }

    this.room.roomItemManager.removeItemFromTilemap(this.item.getUUID());
    this.room.roomItemManager.addItemToTilemap(tileX, tileY, this.item);
    this.item.updatePlacement(tileX, tileY);
    this.stop();
  }
}
