import { Container, Sprite } from "pixi.js";
import { LAND_OFFSET_X, LAND_OFFSET_Y, WALLPAPER_BORDER_OFFSET } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { Wallpaper as TWallpaper, WallpaperContractAddress } from "~/types";

export default class Wallpaper {
  private contract?: WallpaperContractAddress;
  private tokenId?: number;
  container: Container;
  sprite: Sprite;

  constructor() {
    this.contract = undefined;
    this.tokenId = undefined;

    this.container = new Container();
    this.container.x = LAND_OFFSET_X - WALLPAPER_BORDER_OFFSET;
    this.container.y = LAND_OFFSET_Y;
    this.container.zIndex = 1;
    this.sprite = new Sprite();
    this.container.addChild(this.sprite);
  }

  get(): TWallpaper | undefined {
    return this.contract && this.tokenId ? { contract: this.contract, tokenId: this.tokenId } : undefined;
  }

  update(contract?: WallpaperContractAddress, tokenId?: number) {
    this.contract = contract;
    this.tokenId = tokenId;

    if (contract && tokenId) {
      const { engine } = GameInstance.get();
      const texture = engine.assetTextures[contract + "_" + tokenId + ".png"];
      texture.baseTexture.scaleMode = engine.scaleMode;
      this.sprite.texture = texture;
    } else {
      this.container.removeChildren();
      this.sprite = new Sprite();
      this.container.addChild(this.sprite);
    }
  }
}
