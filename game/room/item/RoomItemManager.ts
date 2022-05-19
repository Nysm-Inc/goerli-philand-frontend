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

  // @ts-ignore
  onClick(e, item) {
    const { room, uiManager } = GameInstance.get();
    if (room.movingItemManager.getItem()) return;

    const origin = e.data.originalEvent;
    uiManager.onOpenActionMenu(origin.x, origin.y);
    room.movingItemManager.pick(item);
  }

  loadItem(tileX: number, tileY: number, object: IObject) {
    const { room } = GameInstance.get();

    const uuid = crypto.randomUUID();
    const item = new RoomItem(uuid, tileX, tileY, object);
    this.roomItems[uuid] = item;
    this.addItemToTilemap(tileX, tileY, item);
    item.container.on("mousedown", (e) => this.onClick(e, item));
    room.container.addChild(item.container);
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
