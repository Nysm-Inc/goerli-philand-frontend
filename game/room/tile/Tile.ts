import { BaseTexture, Texture } from "pixi.js";
import { TILE_H, TILE_W } from "~/constants";

const startX = TILE_H;
const startY = 0;
const points = [
  {
    x: startX,
    y: startY,
  },
  {
    x: startX - TILE_W / 2,
    y: startY + TILE_H / 2,
  },
  {
    x: startX,
    y: startY + TILE_H,
  },
  {
    x: startX + TILE_W / 2,
    y: startY + TILE_H / 2,
  },
];

type TileType = "grid" | "select" | "collision";

const tileStyles: { [style in TileType]: { stroke: string; fill: string } } = {
  grid: {
    stroke: "rgba(0,0,0,0.1)",
    fill: "transparent",
  },
  select: {
    stroke: "white",
    fill: "transparent",
  },
  collision: {
    stroke: "rgba(229, 77, 77, 0.5)",
    fill: "rgba(229, 77, 77, 0.7)",
  },
};

export const newTile = (typ: TileType): Texture => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = TILE_W;
  canvas.height = TILE_H;

  const style = tileStyles[typ];
  if (ctx != null) {
    ctx.strokeStyle = style.stroke;
    ctx.fillStyle = style.fill;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.lineTo(points[0].x, points[0].y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  return new Texture(new BaseTexture(canvas));
};
