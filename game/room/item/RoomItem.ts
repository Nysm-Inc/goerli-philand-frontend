import { Container, Rectangle, Sprite } from "pixi.js";
import { PHI_OBJECT_CONTRACT_ADDRESS, TILE_W } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { tileToLocal } from "~/game/room/pos";
import { IObject } from "~/game/room/types";

export default class RoomItem {
  private object: IObject;
  private uuid: string;
  private tileX: number;
  private tileY: number;
  container: Container;
  sprites: Sprite[];

  constructor(uuid: string, tileX: number, tileY: number, object: IObject) {
    this.object = {
      contractAddress: object.contractAddress,
      tokenId: object.tokenId,
      sizeX: object.sizeX,
      sizeY: object.sizeY,
    };
    this.uuid = uuid;
    this.tileX = tileX;
    this.tileY = tileY;

    this.container = new Container();
    this.container.interactive = true;
    this.container.buttonMode = true;
    this.container.name = uuid;
    this.sprites = [];

    const { engine } = GameInstance.get();
    const texture = engine.globalTextures[PHI_OBJECT_CONTRACT_ADDRESS][object.tokenId].clone();
    const sprite = Sprite.from(texture);

    const local = tileToLocal(tileX + object.sizeX, tileY + object.sizeY);
    this.container.x = local.x - (TILE_W / 2) * (object.sizeX - 1);
    this.container.y = local.y - sprite.height;

    for (let n = 0; n < object.sizeX + object.sizeY; n++) {
      const texture = sprite.texture.clone();
      const mask = new Rectangle(n * (TILE_W / 2), 0, TILE_W / 2, sprite.height);
      texture.frame = mask;
      const unit = new Sprite(texture);
      unit.x = n * (TILE_W / 2);

      this.sprites.push(unit);
      this.container.addChild(unit);
    }
    this.updateZIndex();
  }

  getUUID() {
    return this.uuid;
  }

  getSize(): [number, number] {
    return [this.object.sizeX, this.object.sizeY];
  }

  getTile(): [number, number] {
    return [this.tileX, this.tileY];
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }

  updatePlacement(tileX: number, tileY: number) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.updateZIndex();
  }

  updateZIndex() {
    const { room } = GameInstance.get();

    let [px, py] = [this.tileX, this.tileY + this.object.sizeY - 1];
    const wrapN = this.object.sizeX < this.object.sizeY ? this.object.sizeX - 1 : this.object.sizeY - 1;
    for (let n = 0; n < this.object.sizeX + this.object.sizeY; n++) {
      this.sprites[n].parentLayer = room.containerLayer;
      this.sprites[n].zOrder = px + py;
      if (n < wrapN) px++;
      if (n > wrapN) py--;
    }
  }
}
