export type PhiObject = {
  contractAddress: string;
  tokenId: number;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
};

export const phiObjectMetadataList = {
  1: "https://www.arweave.net/uTqeXGE7XmeteLxXsa7YYO_sUaebrCJNnS_l7ak8MN8",
  2: "https://www.arweave.net/ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
};

export type Coupon = {
  r: string;
  s: string;
  v: number;
};

export type ConditionName =
  | "ENSHolding"
  | "ETHHolding"
  | "USDCHolding"
  | "SwapOnUniswap"
  | "DAILiquidityProvidingOnUniswap";

export const conditionList: { [tokenId: number]: { name: ConditionName; value: number } } = {
  1: {
    name: "ENSHolding",
    value: 1,
  },
  2: {
    name: "ETHHolding",
    // value: 0.1, // todo: "01"
    // @ts-ignore
    value: "01",
  },
  3: {
    name: "ETHHolding",
    value: 1,
  },
  7: {
    name: "USDCHolding",
    value: 100,
  },
  10: {
    name: "SwapOnUniswap",
    value: 1,
  },
};
