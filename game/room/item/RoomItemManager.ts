import { PhiObject } from "~/types";
import { IObject } from "~/game/types";
import GameInstance from "~/game/GameInstance";
import RoomItem from "./RoomItem";

export default class RoomItemManager {
  private roomItems: { [uuid: string]: RoomItem };

  constructor() {
    this.roomItems = {};
  }

  getItems() {
    return this.roomItems;
  }

  addItems(objects: PhiObject[]) {
    objects.forEach((object) => {
      this.addItem(object.xStart, object.yStart, {
        contractAddress: object.contractAddress,
        tokenId: object.tokenId,
        sizeX: object.xEnd - object.xStart,
        sizeY: object.yEnd - object.yStart,
      });
    });
  }

  addItem(tileX: number, tileY: number, object: IObject) {
    const uuid = crypto.randomUUID();
    const item = new RoomItem(uuid, tileX, tileY, object);
    this.roomItems[uuid] = item;
    this.addItemToTilemap(tileX, tileY, item);
  }

  removeItem(uuid: string) {
    const { room } = GameInstance.get();

    const item = this.roomItems[uuid];
    room.container.removeChild(item.container);
    this.removeItemFromTilemap(item.getUUID());
    room.movingItemManager.drop();
  }

  addItemToTilemap(tileX: number, tileY: number, item: RoomItem) {
    const { room } = GameInstance.get();

    const [sizeX, sizeY] = item.getSize();
    for (let x = tileX; x < tileX + sizeX; x++) {
      for (let y = tileY; y < tileY + sizeY; y++) {
        room.tileManager.setTilemap(x, y, item.getUUID());
      }
    }
  }

  removeItemFromTilemap(uuid: string) {
    const { room } = GameInstance.get();

    const item = this.roomItems[uuid];
    const [prevTileX, prevTileY] = item.getTile();
    const [sizeX, sizeY] = item.getSize();
    for (let x = prevTileX; x < prevTileX + sizeX; x++) {
      for (let y = prevTileY; y < prevTileY + sizeY; y++) {
        room.tileManager.setTilemap(x, y, "");
      }
    }
  }
}
