import axios from "axios";
import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { PhiLink } from "~/types";
import GameInstance from "~/game/GameInstance";

const PREVIEW_OFFSET = -80;

export default class LinkPreview {
  private link: PhiLink;
  private ogp: string;
  container: Container;
  g: Graphics;
  sprite: Sprite;

  constructor() {
    this.link = { title: "", url: "" };
    this.ogp = "";

    const { room } = GameInstance.get();
    this.container = new Container();
    this.container.visible = false;
    this.container.parentLayer = room.landItemLayer;
    this.container.zOrder = 9999;
    this.container.y = PREVIEW_OFFSET;

    this.g = new Graphics();
    this.g.beginFill(0x000000);
    this.g.drawRoundedRect(0, 0, 296, 80, 16);
    this.g.endFill();
    this.container.addChild(this.g);

    this.sprite = new Sprite();
    this.sprite.x = 16;
    this.sprite.y = 16;
    this.sprite.width = 48;
    this.sprite.height = 48;
    this.container.addChild(this.sprite);
  }

  draw(link: PhiLink) {
    //
  }

  update(link: PhiLink) {
    this.link = link;
    this.draw(link);

    (async () => {
      try {
        const url = new URL(link.url);
        const res = await axios.get<{ ogp: string }>(`/api/fetchOGP?url=${url}`);
        this.ogp = res.data.ogp;
        this.sprite.texture = Texture.from(this.ogp);
      } catch {}
    })();
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }
}
