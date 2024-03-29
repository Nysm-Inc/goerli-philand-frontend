import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";

export const getEXP = async (address: string) => {
  const u = new URL(UTILS_API_GATEWAY + "/leader/exp");
  u.searchParams.append("address", address);
  const res = await axios.get<{ expGain: number }>(u.toString());
  return res?.data?.expGain || 0;
};

export const updateEXP = async (address: string): Promise<void> => {
  const u = new URL(UTILS_API_GATEWAY + "/leader/exp");
  u.searchParams.append("address", address);
  return axios.post(u.toString());
};

type GetMyScoreAPIResponse = {
  data: {
    landPowerScore: number;
    socialScore: number;
    attentionScore: number;
    landPowerRank: number;
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
    landPower: data?.landPowerScore || 0,
    social: data?.socialScore || 0,
    attention: data?.attentionScore || 0,
    landPowerRank: data?.landPowerRank || 0,
    socialRank: data?.socialRank || 0,
    attentionRank: data?.attentionRank || 0,
  };
};

type Score = { name: string; value: number };

type GetTopScoreAPIResponse = {
  data: {
    landPowerScore: Score[];
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
    landPower: data?.landPowerScore || [],
    social: data?.socialScore || [],
    attention: data?.attentionScore || [],
  };
};
