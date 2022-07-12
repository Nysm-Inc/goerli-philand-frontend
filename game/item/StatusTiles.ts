import { BaseTexture, Point, Sprite, Texture } from "pixi.js";
import Item from "~/game/item/Item";

type Bounds = { leftTop: Point; rightTop: Point; leftBottom: Point; rightBottom: Point };

export default class StatusTiles {
  private collision: Sprite;
  private select: Sprite;
  private placeable: Sprite;

  constructor(item: Item) {
    const bounds = item.getTileBounds();
    const collideTexture = newTile("collide", bounds);
    this.collision = new Sprite(collideTexture);
    this.collision.visible = false;
    this.collision.y = item.container.height - collideTexture.height;
    item.container.addChild(this.collision);

    const selectTexture = newTile("select", bounds);
    this.select = new Sprite(selectTexture);
    this.select.visible = false;
    this.select.y = item.container.height - this.select.height;
    item.container.addChild(this.select);

    const placeableTexture = newTile("placeable", bounds);
    this.placeable = new Sprite(placeableTexture);
    this.placeable.visible = false;
    this.placeable.y = item.container.height - this.placeable.height;
    item.container.addChild(this.placeable);
  }

  showCollisionTile() {
    this.select.visible = false;
    this.placeable.visible = false;
    this.collision.visible = true;
  }

  showSelectTile() {
    this.collision.visible = false;
    this.placeable.visible = false;
    this.select.visible = true;
  }

  showPlaceableTile() {
    this.collision.visible = false;
    this.select.visible = false;
    this.placeable.visible = true;
  }

  hideTile() {
    this.collision.visible = false;
    this.select.visible = false;
    this.placeable.visible = false;
  }
}

type TileStyle = { stroke: string; fill: string };
type TileType = "select" | "placeable" | "collide";
const tileStyles: { [typ in TileType]: TileStyle } = {
  select: {
    stroke: "rgba(255, 255, 255, 0.5)",
    fill: "rgba(255, 255, 255, 0.5)",
  },
  placeable: {
    stroke: "#14B881",
    fill: "rgba(16, 185, 129, 0.48)",
  },
  collide: {
    stroke: "#EF4444",
    fill: "rgba(239, 68, 68, 0.48)",
  },
};

const newTile = (tileType: TileType, bounds: Bounds): Texture => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = bounds.rightTop.x - bounds.leftBottom.x;
  canvas.height = bounds.rightBottom.y - bounds.leftTop.y;

  const tileStyle = tileStyles[tileType];
  if (ctx != null) {
    ctx.fillStyle = tileStyle.fill;
    ctx.strokeStyle = tileStyle.stroke;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bounds.leftTop.x, bounds.leftTop.y);
    ctx.lineTo(bounds.leftBottom.x, bounds.leftBottom.y);
    ctx.lineTo(bounds.rightBottom.x, bounds.rightBottom.y);
    ctx.lineTo(bounds.rightTop.x, bounds.rightTop.y);
    ctx.lineTo(bounds.leftTop.x, bounds.leftTop.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  return new Texture(new BaseTexture(canvas));
};
