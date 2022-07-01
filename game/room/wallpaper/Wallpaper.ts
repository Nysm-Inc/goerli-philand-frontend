import { Container, Sprite } from "pixi.js";
import { LAND_OFFSET_X, LAND_OFFSET_Y, WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import GameInstance from "~/game/GameInstance";
import { Wallpaper as TWallpaper } from "~/types";

export default class Wallpaper {
  private contract: typeof WALLPAPER_CONTRACT_ADDRESS;
  private tokenId: number;
  container: Container;
  sprite: Sprite;

  constructor() {
    this.contract = WALLPAPER_CONTRACT_ADDRESS;
    this.tokenId = 0;

    this.container = new Container();
    this.container.x = LAND_OFFSET_X;
    this.container.y = LAND_OFFSET_Y;
    this.container.zIndex = 1;
    this.sprite = new Sprite();
    this.container.addChild(this.sprite);
  }

  get(): TWallpaper {
    return { contractAddress: this.contract, tokenId: this.tokenId };
  }

  update(tokenId: number) {
    this.tokenId = tokenId;

    if (tokenId) {
      const { engine } = GameInstance.get();
      const texture = engine.globalTextures[WALLPAPER_CONTRACT_ADDRESS][tokenId].clone();
      this.sprite.texture = texture;
    } else {
      this.container.removeChildren();
      this.sprite = new Sprite();
      this.container.addChild(this.sprite);
    }
  }
}
