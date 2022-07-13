import { v4 as uuidv4 } from "uuid";
import { PhiObject, IObject } from "~/types";
import GameInstance from "~/game/GameInstance";
import { ROOM_TILE_N } from "~/constants";
import { isValidTile } from "~/game/room/helper";
import RoomItem from "./RoomItem";

const emptyTilemap = (): string[][] => [...Array(ROOM_TILE_N)].map(() => Array(ROOM_TILE_N).fill(""));

export default class RoomItemManager {
  private roomItems: { [uuid: string]: RoomItem };
  private tileMap: string[][];

  constructor() {
    this.roomItems = {};
    this.tileMap = emptyTilemap();
  }

  getItems() {
    return this.roomItems;
  }

  getUUIDFromTilemap(x: number, y: number) {
    return isValidTile(x, y) ? this.tileMap[x][y] : "";
  }

  getTilemap() {
    return this.tileMap;
  }

  setTilemap(x: number, y: number, uuid: string) {
    if (!isValidTile(x, y)) return;
    this.tileMap[x][y] = uuid;
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
    const { room } = GameInstance.get();
    if (room.isEdit) {
      item.container.buttonMode = true;
    }
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
    const [sizeX, sizeY] = item.getSize();
    for (let x = tileX; x < tileX + sizeX; x++) {
      for (let y = tileY; y < tileY + sizeY; y++) {
        this.setTilemap(x, y, item.getUUID());
      }
    }
  }

  removeItemFromTilemap(uuid: string) {
    const item = this.roomItems[uuid];
    const [prevTileX, prevTileY] = item.getTile();
    const [sizeX, sizeY] = item.getSize();
    for (let x = prevTileX; x < prevTileX + sizeX; x++) {
      for (let y = prevTileY; y < prevTileY + sizeY; y++) {
        this.setTilemap(x, y, "");
      }
    }
  }

  reset() {
    this.roomItems = {};
    this.tileMap = emptyTilemap();

    const { room } = GameInstance.get();
    room.landItemContainer.removeChildren();
    room.landItemLayer.removeChildren();
  }

  randomUUID() {
    // return crypto.randomUUID(); // not working on mobile
    return uuidv4();
  }
}
