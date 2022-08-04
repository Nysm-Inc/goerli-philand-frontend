import axios from "axios";
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { ethers } from "ethers";
import { PhiLink } from "~/types";
import GameInstance from "~/game/GameInstance";
import { postAccess } from "~/utils/access";
import { isValid } from "~/utils/ens";
import { ColorMode } from "~/ui/styles";

export default class LinkPreview {
  private link: PhiLink;
  private ogpURL: string;
  container: Container;

  bgLight: Graphics;
  bgDark: Graphics;
  text: Text;
  defaultOGP: Graphics;
  ogp: Sprite;

  constructor() {
    this.link = { title: "", url: "" };
    this.ogpURL = "";

    const { room } = GameInstance.get();
    this.container = new Container();
    this.container.interactive = true;
    this.container.visible = false;
    this.container.parentLayer = room.landItemLayer;
    this.container.zOrder = 9999;

    const clickableArea = new Container();
    clickableArea.interactive = true;
    clickableArea.buttonMode = true;
    clickableArea.on("mousedown", () => this.onMousedown(), this);
    this.container.addChild(clickableArea);
    const hiddenArea = new Container();
    this.container.addChild(hiddenArea);

    this.bgLight = new Graphics();
    this.bgLight.visible = false;
    this.bgLight.beginFill(0x000000);
    this.bgLight.drawRoundedRect(0, 0, 296, 64, 16);
    this.bgLight.endFill();
    clickableArea.addChild(this.bgLight);

    this.bgDark = new Graphics();
    this.bgDark.visible = false;
    this.bgDark.beginFill(0xffffff);
    this.bgDark.drawRoundedRect(0, 0, 296, 64, 16);
    this.bgDark.endFill();
    clickableArea.addChild(this.bgDark);

    const gapArea = new Graphics();
    gapArea.beginFill(0xffffff, 0.001);
    gapArea.drawRoundedRect(0, 64, 296, 64 * 2, 0);
    gapArea.endFill();
    hiddenArea.addChild(gapArea);

    this.defaultOGP = new Graphics();
    this.defaultOGP.beginFill(0xcccccc);
    this.defaultOGP.drawRoundedRect(8, 8, 48, 48, 8);
    this.defaultOGP.endFill();
    clickableArea.addChild(this.defaultOGP);

    this.ogp = new Sprite();
    this.ogp.x = 8;
    this.ogp.y = 8;
    this.ogp.width = 48;
    this.ogp.height = 48;
    clickableArea.addChild(this.ogp);

    // memo: paragraph-1
    this.text = new Text("", {
      fontFamily: "JetBrainsMono", // todo
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: 24,
      letterSpacing: -0.02,
      align: "center",
    });
    this.text.x = 48 + 8 + 8;
    this.text.y = 64 / 2 - 8;
    clickableArea.addChild(this.text);
  }

  draw(colorMode: ColorMode) {
    this.text.text = this.link.title.length > 16 ? `${this.link.title.substring(0, 12)}...` : this.link.title;
    this.text.style.fill = colorMode === "light" ? 0xffffff : 0x000000;
  }

  update(link: PhiLink) {
    this.link = link;

    (async () => {
      try {
        const url = new URL(link.url);
        const res = await axios.get<{ ogp: string }>(`/api/fetchOGP?url=${url}`);
        const img = new Image();
        img.src = res.data.ogp;
        img.onload = () => {
          this.ogpURL = res.data.ogp;

          const w = 48 * (img.width / img.height);

          this.defaultOGP.beginFill(0xcccccc);
          this.defaultOGP.drawRoundedRect(8, 8, w, 48, 8);
          this.defaultOGP.endFill();

          this.ogp.width = w;
          this.ogp.texture = Texture.from(this.ogpURL);
          this.ogp.mask = this.defaultOGP;

          this.text.x = w + 8 + 8;
        };
      } catch {
        const icon = Sprite.from("/assets/default_ogp.png");
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

  async onMousedown() {
    try {
      const target = new URL(this.link.url);
      const landENS = new URL(window.location.href).pathname.slice(1);
      if (isValid(landENS)) {
        let address = "";
        if (window.ethereum) {
          // @ts-ignore
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          address = await provider.getSigner().getAddress();
        }
        postAccess(landENS, target.toString(), address);
      }
      if (isValid(target.pathname.slice(1))) {
        window.location.href = target.toString();
      } else {
        window.open(target, "_blank");
      }
    } catch {}
  }
}
