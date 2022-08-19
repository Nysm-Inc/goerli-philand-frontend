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
  activities: string[];
};

export let conditionList: { [tokenId: number]: Condition } = {};

const setConditionList = async () => {
  const list = await getConditionList();
  conditionList = list.reduce((memo, v) => {
    return {
      ...memo,
      [v.tokenId]: v,
    };
  }, {});
};
setConditionList();

export type QuestClaimable = {
  tokenId: string;
  condition: string;
  value: string;
  timeStamp: string;
};

export type QuestClaimableList = { [tokenId: number]: QuestClaimable | null };

export type QuestProgress = {
  tokenId: number;
  condition: string;
  value: number;
  counter: number;
};

export type QuestProgressList = { [tokenId: number]: QuestProgress | null };
