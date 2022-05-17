// @ts-nocheck
// https://github.com/pixijs/pixijs/wiki/v5-Hacks#pixel-perfect-interaction

import { Sprite } from "pixi.js";

Sprite.prototype.containsPoint = function (point) {
  const tempPoint = { x: 0, y: 0 };
  this.worldTransform.applyInverse(point, tempPoint);

  const width = this._texture.orig.width;
  const height = this._texture.orig.height;
  const x1 = -width * this.anchor.x;
  let y1 = 0;

  let flag = false;
  if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
    y1 = -height * this.anchor.y;

    if (tempPoint.y >= y1 && tempPoint.y < y1 + height) {
      flag = true;
    }
  }
  if (!flag) {
    return false;
  }

  const tex = this.texture;
  const baseTex = this.texture.baseTexture;
  const res = baseTex.resolution;
  if (!baseTex.hitmap) {
    if (!genHitmap(baseTex, 255)) {
      return true;
    }
  }
  const hitmap = baseTex.hitmap;

  let dx = Math.round((tempPoint.x - x1 + tex.frame.x) * res);
  let dy = Math.round((tempPoint.y - y1 + tex.frame.y) * res);
  let ind = dx + dy * baseTex.realWidth;
  let ind1 = ind % 32;
  let ind2 = (ind / 32) | 0;
  return (hitmap[ind2] & (1 << ind1)) !== 0;
};

const genHitmap = (baseTex, threshold) => {
  if (!baseTex.resource) {
    return false;
  }
  const imgSource = baseTex.resource.source;
  let canvas = null;
  if (!imgSource) {
    return false;
  }
  let context = null;
  if (imgSource.getContext) {
    canvas = imgSource;
    context = canvas.getContext("2d");
  } else if (imgSource instanceof Image) {
    canvas = document.createElement("canvas");
    canvas.width = imgSource.width;
    canvas.height = imgSource.height;
    context = canvas.getContext("2d");
    context.drawImage(imgSource, 0, 0);
  } else {
    return false;
  }

  const w = canvas.width;
  const h = canvas.height;
  let imageData = context.getImageData(0, 0, w, h);
  let hitmap = (baseTex.hitmap = new Uint32Array(Math.ceil((w * h) / 32)));
  for (let i = 0; i < w * h; i++) {
    let ind1 = i % 32;
    let ind2 = (i / 32) | 0;
    if (imageData.data[i * 4 + 3] >= threshold) {
      hitmap[ind2] = hitmap[ind2] | (1 << ind1);
    }
  }
  return true;
};
