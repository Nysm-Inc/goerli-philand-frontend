import { Container, Sprite } from "pixi.js";
import { TILE_W } from "~/constants";
import { tileToLocal } from "~/game/room/pos";
import { IObject } from "~/game/room/types";

export default class RoomItem {
  private object: IObject;
  private uuid: string;
  private tileX: number;
  private tileY: number;
  container: Container;
  // todo: sprites: Sprite[]

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

    const sprite = Sprite.from(
      // todo: read from types
      // @ts-ignore
      { 1: "objects/nouns.png", 2: "objects/computer.png", 3: "objects/hardhat.png", 4: "objects/ledger.png" }[
        object.tokenId
      ]
    );
    sprite.texture.baseTexture.on("loaded", () => {
      const local = tileToLocal(tileX + object.sizeX, tileY + object.sizeY);
      this.container.x = local.x - (TILE_W / 2) * (object.sizeX - 1);
      this.container.y = local.y - sprite.height;
    });
    this.updateZIndex();
    this.container.addChild(sprite);
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

  startMovement() {
    this.container.alpha = 0.6;
  }

  stopMovement() {
    this.container.alpha = 1.0;
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
    // todo
    this.container.zIndex = this.tileX + this.tileY;
  }
}
