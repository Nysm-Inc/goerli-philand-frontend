import { Container, Rectangle, Sprite } from "pixi.js";
import { PHI_OBJECT_CONTRACT_ADDRESS, TILE_W } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { IObject } from "~/game/types";

export default class Item {
  private uuid: string;
  private object: IObject;
  container: Container;
  sprites: Sprite[];

  constructor(uuid: string, object: IObject) {
    this.uuid = uuid;
    this.object = {
      contractAddress: object.contractAddress,
      tokenId: object.tokenId,
      sizeX: object.sizeX,
      sizeY: object.sizeY,
    };
    this.container = new Container();
    this.container.interactive = true;
    this.container.buttonMode = true;
    this.container.name = uuid;
    this.sprites = [];

    const { engine, room } = GameInstance.get();
    const texture = engine.globalTextures[PHI_OBJECT_CONTRACT_ADDRESS][object.tokenId].clone();
    const sprite = Sprite.from(texture);

    for (let n = 0; n < object.sizeX + object.sizeY; n++) {
      const texture = sprite.texture.clone();
      const mask = new Rectangle(n * (TILE_W / 2), 0, TILE_W / 2, sprite.height);
      texture.frame = mask;
      const unit = new Sprite(texture);
      unit.x = n * (TILE_W / 2);

      this.sprites.push(unit);
      this.container.addChild(unit);
    }

    room.container.addChild(this.container);
  }

  getUUID() {
    return this.uuid;
  }

  getSize(): [number, number] {
    return [this.object.sizeX, this.object.sizeY];
  }

  getObject() {
    return this.object;
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }
}
