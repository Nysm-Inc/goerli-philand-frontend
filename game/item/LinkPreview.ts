import axios from "axios";
import { Container, Graphics, SCALE_MODES, Sprite, Text, Texture } from "pixi.js";
import { PhiLink } from "~/types";
import GameInstance from "~/game/GameInstance";
import { postAccess } from "~/utils/access";
import { isValid } from "~/utils/ens";

const PREVIEW_OFFSET = -80;

export default class LinkPreview {
  private link: PhiLink;
  private ogpURL: string;
  container: Container;
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

    const g = new Graphics();
    g.beginFill(0x000000);
    g.drawRoundedRect(0, 0, 296, 80, 16);
    g.endFill();
    g.interactive = true;
    g.buttonMode = true;
    g.on("mousedown", () => {
      try {
        const target = new URL(this.link.url);
        const landENS = new URL(window.location.href).pathname.slice(1);
        if (isValid(landENS)) {
          postAccess(landENS, target.toString(), "");
        }
        if (isValid(target.pathname.slice(1))) {
          window.location.href = target.toString();
        } else {
          window.open(target, "_blank");
        }
      } catch {}
    });
    this.container.addChild(g);

    const gapArea = new Graphics();
    gapArea.beginFill(0xffffff, 0.001);
    gapArea.drawRoundedRect(0, 80, 296, 80, 0);
    gapArea.endFill();
    this.container.addChild(gapArea);

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
        this.ogp.mask = this.defaultOGP;
      } catch {}
    })();
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }
}
