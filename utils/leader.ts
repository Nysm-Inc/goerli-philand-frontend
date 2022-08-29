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

export const getScore = async (ens?: string, top?: boolean) => {
  const u = new URL(UTILS_API_GATEWAY + "/leader/score");
  if (ens) u.searchParams.append("name", ens.slice(0, -4));
  if (top) u.searchParams.append("top", "true");
  return axios.get(u.toString());
};
