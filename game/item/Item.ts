import { Container, Point, Rectangle, Sprite, Texture } from "pixi.js";
import { TILE_W } from "~/constants";
import { IObject, PhiLink } from "~/types";
import GameInstance from "~/game/GameInstance";
import { calcPoint } from "~/game/room/helper";
import LinkPreview from "./LinkPreview";
import StatusTiles from "./StatusTiles";

export default class Item {
  private uuid: string;
  private object: IObject;
  private preview: LinkPreview;
  private tiles: StatusTiles;
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

    const { engine, room } = GameInstance.get();
    const texture = engine.assetTextures[object.contractAddress + "_" + object.tokenId + ".png"];
    texture.baseTexture.scaleMode = engine.scaleMode;
    const splitW = texture.frame.width / (object.sizeX + object.sizeY);
    for (let n = 0; n < object.sizeX + object.sizeY; n++) {
      const frame = new Rectangle(texture.frame.x + n * splitW, texture.frame.y, splitW, texture.frame.height);
      const split = new Sprite(new Texture(texture.baseTexture, frame));
      split.x = n * splitW;
      this.sprites.push(split);
      this.container.addChild(split);
    }

    this.preview = new LinkPreview();
    this.preview.container.x = texture.width / 2 - this.preview.container.width / 2;
    this.preview.container.y = -48;
    this.preview.update(object.link);
    this.container.on("mouseover", () => this.showLinkPreview(), this);
    this.container.on("mouseout", () => this.hideLinkPreview(), this);
    engine.viewport.on("touchstart", () => {
      if (engine.isMobile) room.roomItemManager.hideLinkPreviews();
    });
    this.container.on(
      "touchend",
      () => {
        if (engine.isMobile) this.showLinkPreview();
      },
      this
    );
    this.container.addChild(this.preview.container);

    this.tiles = new StatusTiles(this);
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

  getTiles() {
    return this.tiles;
  }

  getTileBounds(): { leftTop: Point; rightTop: Point; leftBottom: Point; rightBottom: Point } {
    const [sizeX, sizeY] = this.getSize();
    const baseSize = sizeY;

    const leftTop = new Point((TILE_W / 2) * baseSize, 0);
    const rightTop = calcPoint(sizeX, 0, leftTop);
    const leftBottom = calcPoint(0, sizeY, leftTop);
    const rightBottom = calcPoint(sizeX, sizeY, leftTop);
    return { leftTop, rightTop, leftBottom, rightBottom };
  }

  updateLink(link: PhiLink) {
    this.object.link = link;
    this.preview.update(link);
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }

  showLinkPreview() {
    const { room, engine } = GameInstance.get();
    if (room.movingItemManager.isMoving) return;
    if (!this.object.link.title && !this.object.link.url) return;

    if (engine.colorMode === "light") {
      this.preview.bgLight.visible = true;
      this.preview.bgLightArrow.visible = true;
      this.preview.bgDark.visible = false;
      this.preview.bgDarkArrow.visible = false;
    } else {
      this.preview.bgLight.visible = false;
      this.preview.bgLightArrow.visible = false;
      this.preview.bgDark.visible = true;
      this.preview.bgDarkArrow.visible = true;
    }
    this.preview.draw(engine.colorMode);
    this.preview.container.visible = true;
  }

  hideLinkPreview() {
    const { room } = GameInstance.get();
    if (room.movingItemManager.isMoving) return;
    this.preview.container.visible = false;
  }
}
