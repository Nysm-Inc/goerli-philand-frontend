import axios from "axios";
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { PhiLink } from "~/types";
import GameInstance from "~/game/GameInstance";

const PREVIEW_OFFSET = -80;

export default class LinkPreview {
  private link: PhiLink;
  private ogpURL: string;
  container: Container;
  g: Graphics;
  ogp: Sprite;
  defaultOGP: Graphics;

  constructor() {
    this.link = { title: "", url: "" };
    this.ogpURL = "";

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

    this.defaultOGP = new Graphics();
    this.defaultOGP.beginFill(0xffffff);
    this.defaultOGP.drawRoundedRect(16, 16, 48, 48, 4);
    this.defaultOGP.endFill();
    this.container.addChild(this.defaultOGP);

    this.ogp = new Sprite();
    this.ogp.x = 16;
    this.ogp.y = 16;
    this.ogp.width = 48;
    this.ogp.height = 48;
    this.container.addChild(this.ogp);
  }

  draw(link: PhiLink) {
    // memo: paragraph-1
    const text = new Text(link.title.length > 16 ? `${link.title.substring(0, 16)}...` : link.title, {
      fontFamily: "JetBrainsMono",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: 24,
      fill: 0xffffff,
      align: "center",
    });
    text.x = 48 + 16 + 16;
    text.y = (48 + 16) / 2;
    this.container.addChild(text);
  }

  update(link: PhiLink) {
    this.link = link;
    this.draw(link);

    (async () => {
      try {
        const url = new URL(link.url);
        const res = await axios.get<{ ogp: string }>(`/api/fetchOGP?url=${url}`);
        this.ogpURL = res.data.ogp;
        this.ogp.texture = Texture.from(this.ogpURL);
      } catch {}
    })();
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }
}
