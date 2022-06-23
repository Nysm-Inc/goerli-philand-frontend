import axios from "axios";
import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { PhiLink } from "~/types";

const PREVIEW_OFFSET = { x: 40, y: -40 };

export default class LinkPreview {
  private link: PhiLink;
  private ogp: string;
  container: Container;
  // layer: Layer;
  g: Graphics;
  sprite: Sprite;

  constructor() {
    this.link = { title: "", url: "" };
    this.ogp = "";

    this.container = new Container();
    this.container.zIndex = 100; //
    this.container.visible = false;

    this.g = new Graphics();
    this.g.beginFill(0x000000);
    this.g.drawRoundedRect(PREVIEW_OFFSET.x, PREVIEW_OFFSET.y, 296, 80, 16);
    this.g.endFill();
    this.container.addChild(this.g);

    this.sprite = new Sprite();
    this.sprite.x = PREVIEW_OFFSET.x + 16;
    this.sprite.y = PREVIEW_OFFSET.y + 16;
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
      const res = await axios.get<{ ogp: string }>(`/api/fetchOGP?url=${link.url}`);
      this.ogp = res.data.ogp;
      this.sprite.texture = Texture.from(this.ogp);
    })();
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }
}
