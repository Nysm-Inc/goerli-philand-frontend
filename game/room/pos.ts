import { Point } from "pixi.js";
import { LAND_OFFSET_Y, LAND_W, ROOM_TILE_N, TILE_H, TILE_W } from "~/constants";

export const tileToLocal = (tileX: number, tileY: number): Point => {
  return new Point(
    (tileX - tileY) * (TILE_W / 2) + (LAND_W / 2 - TILE_W / 2),
    (tileX + tileY) * (TILE_H / 2) + LAND_OFFSET_Y
  );
};

export const isValidTile = (tileX: number, tileY: number): boolean => {
  return tileX >= 0 && tileX < ROOM_TILE_N && tileY >= 0 && tileY < ROOM_TILE_N;
};

export const isPlaceble = (tileX: number, tileY: number, sizeX: number, sizeY: number) => {
  return tileX >= 0 && tileX + sizeX <= ROOM_TILE_N && tileY >= 0 && tileY + sizeY <= ROOM_TILE_N;
};
