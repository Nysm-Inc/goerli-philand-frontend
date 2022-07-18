import { getConditionList } from "~/utils/condition";

export type Coupon = {
  r: string;
  s: string;
  v: number;
};

export type Condition = {
  name: string;
  value: string;
  tokenId: string;
  links: {
    title: string;
    url: string;
  }[];
};

export type ClaimableList = {
  TokenId: string;
  Value: string;
  Condition: string;
  TimeStamp: string;
}[];

export let conditionList: { [tokenId: number]: Condition } = {};

const setConditionList = async () => {
  const list = await getConditionList();
  conditionList = list.reduce((memo, v) => {
    return {
      ...memo,
      [v.tokenId]: v,
    };
  }, {} as { [tokenId: number]: Condition });
};
setConditionList();
