import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";

export const getEXP = async (address: string) => {
  const u = new URL(UTILS_API_GATEWAY + "/leader/exp");
  u.searchParams.append("address", address);
  const res = await axios.get<{ result: number }>(u.toString());
  return res?.data?.result || 0;
};

export const updateEXP = async (address: string): Promise<void> => {
  const u = new URL(UTILS_API_GATEWAY + "/leader/exp");
  u.searchParams.append("address", address);
  return axios.post(u.toString());
};

type GetMyScoreAPIResponse = {
  data: {
    activityScore: number;
    socialScore: number;
    attentionScore: number;
    activityRank: number;
    socialRank: number;
    attentionRank: number;
  };
};

export const getMyScore = async (ens: string) => {
  const u = new URL(UTILS_API_GATEWAY + "/leader/score");
  u.searchParams.append("name", ens.slice(0, -4));
  const res = await axios.get<GetMyScoreAPIResponse | null>(u.toString());
  const data = res.data?.data;
  return {
    activity: data?.activityScore || 0,
    social: data?.socialScore || 0,
    attention: data?.attentionScore || 0,
    activityRank: data?.activityRank || 0,
    socialRank: data?.socialRank || 0,
    attentionRank: data?.attentionRank || 0,
  };
};

type Score = { name: string; value: number };

type GetTopScoreAPIResponse = {
  data: {
    activityScore: Score[];
    socialScore: Score[];
    attentionScore: Score[];
  };
};

export const getTopScoreList = async () => {
  const u = new URL(UTILS_API_GATEWAY + "/leader/score");
  u.searchParams.append("top", "true");
  const res = await axios.get<GetTopScoreAPIResponse | null>(u.toString());
  const data = res.data?.data;
  return {
    activity: data?.activityScore || [],
    social: data?.socialScore || [],
    attention: data?.attentionScore || [],
  };
};
