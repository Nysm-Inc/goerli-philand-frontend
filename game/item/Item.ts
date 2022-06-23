import { Container, Rectangle, Sprite } from "pixi.js";
import { TILE_W } from "~/constants";
import { IObject, PhiLink } from "~/types";
import GameInstance from "~/game/GameInstance";
import LinkPreview from "./LinkPreview";

export default class Item {
  private uuid: string;
  private object: IObject;
  private preview: LinkPreview;
  container: Container;
  sprites: Sprite[];

  constructor(uuid: string, object: IObject) {
    this.uuid = uuid;
    this.object = {
      contractAddress: object.contractAddress,
      tokenId: object.tokenId,
      sizeX: object.sizeX,
      sizeY: object.sizeY,
      link: object.link,
    };
    this.container = new Container();
    this.container.interactive = true;
    this.container.name = uuid;
    this.sprites = [];
    this.preview = new LinkPreview();
    this.preview.update(object.link);
    this.container.on("mouseover", (e) => this.mouseOver(), this);
    this.container.on("mouseout", (e) => this.mouseOut(), this);
    this.container.addChild(this.preview.container);

    const { engine, room } = GameInstance.get();
    const texture = engine.globalTextures[object.contractAddress][object.tokenId].clone();
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

    room.landItemContainer.addChild(this.container);
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

  updateLink(link: PhiLink) {
    this.object.link = link;
    this.preview.update(link);
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }

  mouseOver() {
    const { room } = GameInstance.get();
    if (room.isEdit) return;
    if (!this.object.link.title && !this.object.link.url) return;
    this.preview.container.visible = true;
  }

  mouseOut() {
    const { room } = GameInstance.get();
    if (room.isEdit) return;
    this.preview.container.visible = false;
  }
}
