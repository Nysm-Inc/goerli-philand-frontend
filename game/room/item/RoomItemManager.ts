import { v4 as uuidv4 } from "uuid";
import { PhiObject, IObject } from "~/types";
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

  loadItems(objects: PhiObject[]) {
    const { uiManager } = GameInstance.get();
    this.reset();
    objects.forEach((object) => {
      const item = this.addItem(object.xStart, object.yStart, {
        contractAddress: object.contractAddress,
        tokenId: object.tokenId,
        sizeX: object.xEnd - object.xStart,
        sizeY: object.yEnd - object.yStart,
        link: object.link,
      });
      uiManager.onChangeLinkMenu(item.getUUID(), object.link);
    });
  }

  addItem(tileX: number, tileY: number, object: IObject): RoomItem {
    const uuid = this.randomUUID();
    const item = new RoomItem(uuid, tileX, tileY, object);
    this.roomItems[uuid] = item;
    this.addItemToTilemap(tileX, tileY, item);
    return item;
  }

  removeItem(uuid: string) {
    const { room } = GameInstance.get();

    const item = this.roomItems[uuid];
    room.landItemContainer.removeChild(item.container);
    this.removeItemFromTilemap(item.getUUID());
    room.movingItemManager.drop();
    delete this.roomItems[uuid];
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

  reset() {
    const { room } = GameInstance.get();
    this.roomItems = {};
    room.landItemContainer.removeChildren();
    room.landItemLayer.removeChildren();
  }

  randomUUID() {
    // return crypto.randomUUID(); // not working on mobile
    return uuidv4();
  }
}
