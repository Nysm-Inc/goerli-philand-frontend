import { PhiObject } from "~/types";
import { IObject } from "~/game/room/types";
import RoomItem from "./RoomItem";
import GameInstance from "~/game/GameInstance";

export default class RoomItemManager {
  private roomItems: { [uuid: string]: RoomItem };

  constructor() {
    this.roomItems = {};
  }

  getItems() {
    return this.roomItems;
  }

  loadItems(objects: PhiObject[]) {
    objects.forEach((object) => {
      this.loadItem(object.xStart, object.yStart, {
        contractAddress: object.contractAddress,
        tokenId: object.tokenId,
        sizeX: object.xEnd - object.xStart,
        sizeY: object.yEnd - object.yStart,
      });
    });
  }

  loadItem(tileX: number, tileY: number, object: IObject): string {
    const { room } = GameInstance.get();

    const uuid = crypto.randomUUID();
    const item = new RoomItem(uuid, tileX, tileY, object);
    this.roomItems[uuid] = item;
    this.addItemToTilemap(tileX, tileY, item);
    item.container.on("mousedown", (e) => this.onClick(e, item), this);
    room.container.addChild(item.container);
    return uuid;
  }

  removeItem(uuid: string) {
    const { room } = GameInstance.get();

    const item = this.roomItems[uuid];
    room.container.removeChild(item.container);
    this.removeItemFromTilemap(item.getUUID());
    room.movingItemManager.drop();
  }

  // @ts-ignore
  onClick(e, item) {
    const { room, uiManager } = GameInstance.get();
    if (room.movingItemManager.getItem()) return;

    const origin = e.data.originalEvent;
    uiManager.onOpenActionMenu(item.getUUID(), origin.x, origin.y);
    room.movingItemManager.pick(item);
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
