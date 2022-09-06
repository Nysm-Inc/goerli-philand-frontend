import { PhiObject } from "~/types";

const equal = (a: PhiObject, b: PhiObject): boolean => {
  return (
    a.contractAddress === b.contractAddress &&
    a.tokenId === b.tokenId &&
    a.xStart === b.xStart &&
    a.xEnd === b.xEnd &&
    a.yStart === b.yStart &&
    a.yEnd === b.yEnd &&
    a.link.title === b.link.title &&
    a.link.url === b.link.url
  );
};

export const diff = (arr1: PhiObject[], arr2: PhiObject[]): PhiObject[] => {
  return arr1.filter((a1) => !arr2.some((a2) => equal(a1, a2)));
};
