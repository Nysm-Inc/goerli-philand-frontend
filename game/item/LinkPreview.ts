import axios from "axios";
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { PhiLink } from "~/types";
import GameInstance from "~/game/GameInstance";
import { postAccess } from "~/utils/access";
import { isValid } from "~/utils/ens";
import { ColorMode } from "~/ui/styles";

const PREVIEW_OFFSET = -80;

export default class LinkPreview {
  private link: PhiLink;
  private ogpURL: string;
  container: Container;
  bgLight: Graphics;
  bgDark: Graphics;
  defaultOGP: Graphics;
  ogp: Sprite;

  constructor() {
    this.link = { title: "", url: "" };
    this.ogpURL = "";

    const { room } = GameInstance.get();
    this.container = new Container();
    this.container.visible = false;
    this.container.parentLayer = room.landItemLayer;
    this.container.zOrder = 9999;
    this.container.y = PREVIEW_OFFSET;

    this.bgLight = new Graphics();
    this.bgLight.visible = false;
    this.bgLight.beginFill(0x000000);
    this.bgLight.drawRoundedRect(0, 0, 296, 64, 16);
    this.bgLight.endFill();
    this.bgLight.interactive = true;
    this.bgLight.buttonMode = true;
    this.bgLight.on("mousedown", () => this.onMousedown(), this);
    this.container.addChild(this.bgLight);

    this.bgDark = new Graphics();
    this.bgDark.visible = false;
    this.bgDark.beginFill(0xffffff);
    this.bgDark.drawRoundedRect(0, 0, 296, 64, 16);
    this.bgDark.endFill();
    this.bgDark.interactive = true;
    this.bgDark.buttonMode = true;
    this.bgDark.on("mousedown", () => this.onMousedown(), this);
    this.container.addChild(this.bgDark);

    const gapArea = new Graphics();
    gapArea.beginFill(0xffffff, 0.001);
    gapArea.drawRoundedRect(0, 80, 296, 80, 0);
    gapArea.endFill();
    this.container.addChild(gapArea);

    this.defaultOGP = new Graphics();
    this.defaultOGP.beginFill(0xcccccc);
    this.defaultOGP.drawRoundedRect(8, 8, 48, 48, 8);
    this.defaultOGP.endFill();
    this.container.addChild(this.defaultOGP);

    this.ogp = new Sprite();
    this.ogp.x = 8;
    this.ogp.y = 8;
    this.ogp.width = 48;
    this.ogp.height = 48;
    this.container.addChild(this.ogp);
  }

  draw(colorMode: ColorMode) {
    // memo: paragraph-1
    const text = new Text(this.link.title.length > 16 ? `${this.link.title.substring(0, 12)}...` : this.link.title, {
      fontFamily: "JetBrainsMono",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: 24,
      letterSpacing: -0.02,
      fill: colorMode === "light" ? 0xffffff : 0x000000,
      align: "center",
    });
    text.x = 48 + 8 + 8;
    text.y = 64 / 2 - 8;
    this.container.addChild(text);
  }

  update(link: PhiLink) {
    this.link = link;

    (async () => {
      try {
        const url = new URL(link.url);
        const res = await axios.get<{ ogp: string }>(`/api/fetchOGP?url=${url}`);
        this.ogpURL = res.data.ogp;
        this.ogp.texture = Texture.from(this.ogpURL);
        this.ogp.mask = this.defaultOGP;
      } catch {
        const icon = Sprite.from("assets/default_ogp.png");
        icon.width = 30;
        icon.height = 30;
        icon.x = 8 + 9;
        icon.y = 8 + 9;
        this.container.addChild(icon);
      }
    })();
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }

  onMousedown() {
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
  }
}
