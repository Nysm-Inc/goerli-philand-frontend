import axios from "axios";
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { PhiLink } from "~/types";
import GameInstance from "~/game/GameInstance";
import { ColorMode } from "~/ui/styles";
import { jump } from "~/utils/url";

const [bgW, bgH] = [296, 64];
const [arrowW, arrowH] = [16, 8];
const defaultOGPSize = 48;
const paragraph1 = { fontFamily: "JetBrainsMono", fontWeight: "500", fontSize: "16px", lineHeight: 24, letterSpacing: -0.02 };
const label2 = { fontFamily: "JetBrainsMono", fontWeight: "500", fontSize: "12px", lineHeight: 16, letterSpacing: -0.02 };

export default class LinkPreview {
  private link: PhiLink;
  private ogpURL: string;

  container: Container;
  bgLight: Graphics;
  bgDark: Graphics;
  bgLightArrow: Graphics;
  bgDarkArrow: Graphics;
  title: Text;
  url: Text;

  defaultOGP: Graphics;
  defaultOGPIcon: Sprite;
  ogp: Container;

  constructor() {
    this.link = { title: "", url: "" };
    this.ogpURL = "";

    const { room, engine, uiManager } = GameInstance.get();
    this.container = new Container();
    this.container.interactive = true;
    this.container.visible = false;
    this.container.parentLayer = room.landItemLayer;
    this.container.zOrder = 9999;

    const clickableArea = new Container();
    clickableArea.interactive = true;
    clickableArea.buttonMode = true;
    clickableArea.on(
      engine.isMobile ? "touchstart" : "mousedown",
      (e) => {
        e.stopPropagation();
        if (room.isEdit) return;
        jump(this.link.url, uiManager.onPushRouter);
      },
      this
    );
    this.container.addChild(clickableArea);
    const hiddenArea = new Container();
    this.container.addChild(hiddenArea);

    this.bgLight = new Graphics();
    this.bgLight.visible = false;
    this.bgLight.beginFill(0x000000);
    this.bgLight.drawRoundedRect(0, 0, bgW, bgH, 16);
    this.bgLight.endFill();
    clickableArea.addChild(this.bgLight);

    this.bgLightArrow = new Graphics();
    this.bgLightArrow.x = bgW / 2 - arrowW / 2;
    this.bgLightArrow.y = bgH;
    this.bgLightArrow.beginFill(0x000000);
    this.bgLightArrow.lineStyle(0, 0x000000);
    this.bgLightArrow.moveTo(arrowW, 0);
    this.bgLightArrow.lineTo(arrowW / 2, arrowH);
    this.bgLightArrow.lineTo(0, 0);
    this.bgLightArrow.lineTo(arrowW / 2, 0);
    this.bgLightArrow.endFill();
    clickableArea.addChild(this.bgLightArrow);

    this.bgDark = new Graphics();
    this.bgDark.visible = false;
    this.bgDark.beginFill(0xffffff);
    this.bgDark.drawRoundedRect(0, 0, bgW, bgH, 16);
    this.bgDark.endFill();
    clickableArea.addChild(this.bgDark);

    this.bgDarkArrow = new Graphics();
    this.bgDarkArrow.x = bgW / 2 - arrowW / 2;
    this.bgDarkArrow.y = bgH;
    this.bgDarkArrow.beginFill(0xffffff);
    this.bgDarkArrow.lineStyle(0, 0xffffff);
    this.bgDarkArrow.moveTo(arrowW, 0);
    this.bgDarkArrow.lineTo(arrowW / 2, arrowH);
    this.bgDarkArrow.lineTo(0, 0);
    this.bgDarkArrow.lineTo(arrowW / 2, 0);
    this.bgDarkArrow.endFill();
    clickableArea.addChild(this.bgDarkArrow);

    const gapArea = new Graphics();
    gapArea.beginFill(0xffffff, 0.001);
    gapArea.drawRoundedRect(0, bgH, bgW, bgH, 0);
    gapArea.endFill();
    hiddenArea.addChild(gapArea);

    this.defaultOGP = new Graphics();
    this.defaultOGP.beginFill(0xcccccc);
    this.defaultOGP.drawRoundedRect(8, 8, defaultOGPSize, defaultOGPSize, 8);
    this.defaultOGP.endFill();
    clickableArea.addChild(this.defaultOGP);

    this.defaultOGPIcon = Sprite.from("/assets/default_ogp.png");
    this.defaultOGPIcon.width = 30;
    this.defaultOGPIcon.height = 30;
    this.defaultOGPIcon.x = 8 + 9;
    this.defaultOGPIcon.y = 8 + 9;
    this.container.addChild(this.defaultOGPIcon);

    this.ogp = new Container();
    this.ogp.x = 8;
    this.ogp.y = 8;
    clickableArea.addChild(this.ogp);

    // @ts-ignore
    this.title = new Text("", paragraph1);
    this.title.x = defaultOGPSize + 8 + 8;
    this.title.y = 8 + (24 - 16) / 2;
    clickableArea.addChild(this.title);

    // @ts-ignore
    this.url = new Text("", label2);
    this.url.x = defaultOGPSize + 8 + 8;
    this.url.y = 8 + 24 + (16 - 12) / 2;
    clickableArea.addChild(this.url);
  }

  draw(colorMode: ColorMode) {
    this.title.text = this.link.title.length > 16 ? `${this.link.title.substring(0, 12)}...` : this.link.title;
    this.title.style.fill = colorMode === "light" ? 0xffffff : 0x000000;

    try {
      const url = this.link.url.replace(new URL(this.link.url).protocol + "//", "");
      this.url.text = url.length > 32 ? `${url.substring(0, 28)}...` : url;
      this.url.style.fill = 0x8283ff;
    } catch {}
  }

  update(link: PhiLink) {
    (async () => {
      try {
        const url = new URL(link.url);
        this.link = link;
        const res = await axios.get<{ ogp: string }>(`/api/fetchOGP?url=${url}`);
        this.ogpURL = res.data.ogp;
        const ogpTexture = await Texture.fromURL(this.ogpURL);

        const ogpSprite = Sprite.from(ogpTexture);
        const coverSize = ogpTexture.width <= ogpTexture.height ? ogpTexture.width : ogpTexture.height;
        const scale = defaultOGPSize / coverSize;
        const cover = new Graphics().beginFill(0xcccccc).drawRect(0, 0, coverSize, coverSize).endFill();
        cover.position.set(ogpTexture.width / 2 - coverSize / 2, ogpTexture.height / 2 - coverSize / 2);
        ogpSprite.mask = cover;
        ogpSprite.x = -scale * (ogpTexture.width / 2 - coverSize / 2);
        ogpSprite.y = -scale * (ogpTexture.height / 2 - coverSize / 2);
        ogpSprite.scale.set(defaultOGPSize / coverSize);
        ogpSprite.addChild(cover);

        const mask = new Graphics();
        mask.beginFill(0xcccccc);
        mask.drawRoundedRect(0, 0, defaultOGPSize, defaultOGPSize, 8);
        mask.endFill();
        this.ogp.addChild(mask);
        this.ogp.mask = mask;

        this.ogp.addChild(ogpSprite);
        this.container.removeChild(this.defaultOGPIcon);
      } catch {
        this.container.addChild(this.defaultOGPIcon);
        this.ogp.removeChildren();
      }
    })();
  }

  updateContainerPlacement(localX: number, localY: number) {
    this.container.x = localX;
    this.container.y = localY;
  }
}
