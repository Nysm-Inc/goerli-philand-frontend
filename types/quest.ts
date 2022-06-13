export type Coupon = {
  r: string;
  s: string;
  v: number;
};

export type ConditionName =
  | "ENSOwner"
  | "ETHHolding"
  | "USDCHolding"
  | "SwapOnUniswap"
  | "DAILiquidityProvidingOnUniswap";

export const conditionList: { [tokenId: number]: { name: ConditionName; value: string } } = {
  1: {
    name: "ENSOwner",
    value: "1",
  },
  2: {
    name: "ETHHolding",
    value: "01",
  },
  3: {
    name: "ETHHolding",
    value: "1",
  },
  4: {
    name: "ETHHolding",
    value: "5",
  },
  5: {
    name: "ETHHolding",
    value: "10",
  },
  6: {
    name: "ETHHolding",
    value: "50",
  },
  7: {
    name: "USDCHolding",
    value: "100",
  },
  8: {
    name: "USDCHolding",
    value: "1000",
  },
  9: {
    name: "USDCHolding",
    value: "10000",
  },
  10: {
    name: "SwapOnUniswap",
    value: "1",
  },
  11: {
    name: "SwapOnUniswap",
    value: "5",
  },
  12: {
    name: "SwapOnUniswap",
    value: "10",
  },
  13: {
    name: "SwapOnUniswap",
    value: "30",
  },
  14: {
    name: "DAILiquidityProvidingOnUniswap",
    value: "100",
  },
  15: {
    name: "DAILiquidityProvidingOnUniswap",
    value: "1000",
  },
  16: {
    name: "DAILiquidityProvidingOnUniswap",
    value: "10000",
  },
};

export type ClaimableList = {
  TokenId: string;
  Value: string;
  Condition: ConditionName;
  TimeStamp: string;
}[];
