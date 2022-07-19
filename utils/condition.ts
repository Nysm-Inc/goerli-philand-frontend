import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";
import { ClaimableList, Condition } from "~/types/quest";

type ConditionListResponse = { Condition: string; Value: string; TokenId: string; Links: string; Activities: string };

export const getConditionList = async (): Promise<Condition[]> => {
  const url = new URL(UTILS_API_GATEWAY + "/condition/list");
  const res = await axios.get<{ condition: ConditionListResponse[] }>(url.toString());
  return res.data.condition.map((c) => {
    try {
      const links = JSON.parse(c.Links) as { [title: string]: string }[];
      const activities = JSON.parse(c.Activities) as string[];
      return {
        name: c.Condition,
        value: c.Value,
        tokenId: c.TokenId,
        links: links.map((link) => {
          const title = Object.keys(link)[0];
          const url = Object.values(link)[0];
          return { title, url };
        }),
        activities,
      };
    } catch (err) {
      console.error(err);
      return {} as Condition;
    }
  });
};

export const getClaimableList = async (address: string): Promise<ClaimableList> => {
  const url = new URL(UTILS_API_GATEWAY + "/condition/check");
  url.searchParams.append("address", address);
  const res = await axios.get<{ result: ClaimableList }>(url.toString());
  return res.data?.result || [];
};

export const postClaimableList = async (address: string): Promise<void> => {
  const url = new URL(UTILS_API_GATEWAY + "/condition/check");
  url.searchParams.append("address", address);
  return axios.post(url.toString());
};
