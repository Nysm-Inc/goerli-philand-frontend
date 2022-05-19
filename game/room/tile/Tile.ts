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

type TileStyle = "grid" | "select" | "collision";

const tileColors: { [style in TileStyle]: { stroke: string; fill: string } } = {
  grid: {
    stroke: "rgba(0,0,0,0.1)",
    fill: "transparent",
  },
  select: {
    stroke: "white",
    fill: "transparent",
  },
  collision: {
    stroke: "#EF4444",
    fill: "rgba(239, 68, 68, 0.72)",
  },
};

export const newTile = (s: TileStyle): Texture => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = TILE_W;
  canvas.height = TILE_H;

  const color = tileColors[s];
  if (ctx != null) {
    ctx.strokeStyle = color.stroke;
    ctx.fillStyle = color.fill;
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
