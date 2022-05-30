import { Point } from "pixi.js";
import { LAND_OFFSET_Y, LAND_W, ROOM_TILE_N, TILE_H, TILE_W } from "~/constants";

export const tileToLocal = (tileX: number, tileY: number): Point => {
  return new Point(
    (tileX - tileY) * (TILE_W / 2) + (LAND_W / 2 - TILE_W / 2),
    (tileX + tileY) * (TILE_H / 2) + LAND_OFFSET_Y
  );
};

export const itemToLocal = (
  tileX: number,
  tileY: number,
  sizeX: number,
  sizeY: number,
  spriteHeight: number
): Point => {
  const local = tileToLocal(tileX + sizeX, tileY + sizeY);
  return new Point(local.x - (TILE_W / 2) * (sizeX - 1), local.y - spriteHeight);
};

export const isValidTile = (tileX: number, tileY: number): boolean => {
  return tileX >= 0 && tileX < ROOM_TILE_N && tileY >= 0 && tileY < ROOM_TILE_N;
};
