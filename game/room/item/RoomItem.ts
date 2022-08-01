import GameInstance from "~/game/GameInstance";
import Item from "~/game/item/Item";
import { isValidTile, itemToLocal } from "~/game/room/helper";
import { IObject, PhiObject } from "~/types";

export default class RoomItem extends Item {
  private tileX: number;
  private tileY: number;

  constructor(uuid: string, tileX: number, tileY: number, object: IObject) {
    super(uuid, object);

    const local = itemToLocal(tileX, tileY, object.sizeX, object.sizeY, this.container.height);
    this.container.x = local.x;
    this.container.y = local.y;
    this.tileX = tileX;
    this.tileY = tileY;

    this.updateZIndex();
    this.container.on("mousedown", (e) => this.onMousedown(e, this));
  }

  getTile(): [number, number] {
    return [this.tileX, this.tileY];
  }

  getPhiObject(): PhiObject {
    const [tileX, tileY] = this.getTile();
    const [sizeX, sizeY] = this.getSize();
    const object = this.getObject();
    return {
      contractAddress: object.contractAddress,
      tokenId: object.tokenId,
      xStart: tileX,
      yStart: tileY,
      xEnd: tileX + sizeX,
      yEnd: tileY + sizeY,
      link: object.link,
    };
  }

  updatePlacement(tileX: number, tileY: number) {
    if (!isValidTile(tileX, tileY)) return;

    this.tileX = tileX;
    this.tileY = tileY;
    this.updateZIndex();
  }

  updateZIndex() {
    const { room } = GameInstance.get();

    const [sizeX, sizeY] = this.getSize();
    let [px, py] = [this.tileX, this.tileY + sizeY - 1];
    const wrapN = sizeX - 1;
    for (let n = 0; n < sizeX + sizeY; n++) {
      this.sprites[n].parentLayer = room.landItemLayer;
      this.sprites[n].zOrder = px + py;
      if (n < wrapN) px++;
      if (n > wrapN) py--;
    }
  }

  // @ts-ignore
  onMousedown(e, item) {
    const { room, uiManager } = GameInstance.get();
    if (!room.isEdit) return;
    if (room.movingItemManager.getItem()) return;

    const origin = e.data.originalEvent;
    uiManager.onOpenActionMenu(item.getUUID(), origin.x, origin.y);
    room.movingItemManager.pick(item);
  }
}
